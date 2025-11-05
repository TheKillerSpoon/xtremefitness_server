import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const ROLES_BLOCKED = ["admin", "guest"];

const userScheme = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String, default: "/users/no-user.png" },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true, default: "guest" },

    enrolledWorkouts: {
      type: [{ type: Schema.Types.ObjectId, ref: "workout" }],
      set(v) {
        return ROLES_BLOCKED.includes(this.role) ? undefined : v;
      },
    },

    subscription: {
      type: Schema.Types.ObjectId,
      ref: "subscription",
      set(v) {
        return ROLES_BLOCKED.includes(this.role) ? undefined : v;
      },
    },
  },
  { timestamps: true }
);

userScheme.pre("save", function (next) {
  if (ROLES_BLOCKED.includes(this.role)) {
    this.set("subscription", undefined);
    this.set("enrolledWorkouts", undefined);
  }
  next();
});

function stripBlockedInUpdate(next) {
  const update = this.getUpdate() || {};
  const setObj = update.$set || {};
  const roleInUpdate = setObj.role ?? update.role;

  const willBeBlocked = roleInUpdate && ROLES_BLOCKED.includes(roleInUpdate);

  const ensureUnset = () => {
    update.$unset = {
      ...(update.$unset || {}),
      subscription: "",
      enrolledWorkouts: "",
    };
    if (update.$set) {
      delete update.$set.subscription;
      delete update.$set.enrolledWorkouts;
    }
    delete update.subscription;
    delete update.enrolledWorkouts;
    this.setUpdate(update);
  };

  if (willBeBlocked) {
    ensureUnset();
    return next();
  }

  if (
    update.subscription ||
    update.enrolledWorkouts ||
    (update.$set &&
      ("subscription" in update.$set || "enrolledWorkouts" in update.$set))
  ) {
    return this.model
      .findOne(this.getQuery(), { role: 1 })
      .then((doc) => {
        if (doc && ROLES_BLOCKED.includes(doc.role)) ensureUnset();
        next();
      })
      .catch(next);
  }

  next();
}

userScheme.pre("findOneAndUpdate", stripBlockedInUpdate);
userScheme.pre("updateOne", stripBlockedInUpdate);
userScheme.pre("updateMany", stripBlockedInUpdate);

userScheme.path("subscription").validate(function (v) {
  return ROLES_BLOCKED.includes(this.role) ? v == null : true;
});
userScheme.path("enrolledWorkouts").validate(function (v) {
  return ROLES_BLOCKED.includes(this.role) ? v == null || v.length === 0 : true;
});

userScheme.pre("validate", function (next) {
  if (ROLES_BLOCKED.includes(this.role)) {
    this.subscription = undefined;
    this.enrolledWorkouts = undefined;
  }
  next();
});

userScheme.path("subscription").validate(function (v) {
  return ROLES_BLOCKED.includes(this.role) ? v == null : true;
}, "Admins og guests må ikke have subscription.");

userScheme.path("enrolledWorkouts").validate(function (v) {
  return ROLES_BLOCKED.includes(this.role) ? !v || v.length === 0 : true;
}, "Admins og guests må ikke have enrolledWorkouts.");

export default mongoose.models.user || mongoose.model("user", userScheme);
