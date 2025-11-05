import userModel from "../../models/user.model.mjs";
import dbConnect from "../../dbConnect.js";
import messageModel from "../../models/message.model.mjs";
import employeeModel from "../../models/employee.model.mjs";
import subscriptionModel from "../../models/subscription.model.mjs";
// import benefitModel from "../../models/benefit.model.mjs";
import serviceModel from "../../models/service.model.mjs";
import reviewModel from "../../models/review.model.mjs";
import blogModel from "../../models/blog.model.mjs";
import exerciseModel from "../../models/exercise.model.mjs";
import workoutModel from "../../models/workout.model.mjs";

/*
    Create new User
*/
export const seedUser = async (user) => {
  await dbConnect();

  try {
    // Prefix billede
    if (user?.picture && !String(user.picture).startsWith("http")) {
      user.picture = process.env.SERVER_HOST + user.picture;
    }

    const role = user?.role;

    // Hvis admin/guest: fjern felter med det samme
    if (role && ["admin", "guest"].includes(role)) {
      delete user.subscription;
      delete user.enrolledWorkouts;
    }

    // Subscription kun for member
    if (role === "member") {
      let subscriptionId = null;

      if (typeof user.subscription === "string") {
        const matched = await subscriptionModel.findOne({
          title: user.subscription,
        });
        if (matched?._id) subscriptionId = matched._id;
      }

      if (subscriptionId) user.subscription = subscriptionId;
      else delete user.subscription;
    } else {
      if (typeof user.subscription === "string") delete user.subscription;
    }

    // Enrolled workouts: kun hvis IKKE admin/guest
    if (role !== "admin" && role !== "guest" && user?.enrolledWorkouts) {
      let workoutTitles = [];
      if (Array.isArray(user.enrolledWorkouts)) {
        workoutTitles = user.enrolledWorkouts.filter(
          (t) => typeof t === "string" && t.trim()
        );
      } else if (
        typeof user.enrolledWorkouts === "string" &&
        user.enrolledWorkouts.trim()
      ) {
        workoutTitles = [user.enrolledWorkouts.trim()];
      }

      if (workoutTitles.length) {
        const workouts = await workoutModel.find(
          { title: { $in: workoutTitles } },
          { _id: 1 }
        );
        const ids = workouts.map((w) => w._id);
        if (!ids.length) {
          const any = await workoutModel
            .findOne({}, { _id: 1 })
            .sort({ title: 1 });
          if (any?._id) user.enrolledWorkouts = [any._id];
          else delete user.enrolledWorkouts;
        } else {
          user.enrolledWorkouts = ids;
        }
      } else {
        delete user.enrolledWorkouts;
      }
    } else {
      delete user.enrolledWorkouts; // ekstra sikring
    }
    // --- SIDSTE SIKRING: fjern felter lige inden create ---
    if (["admin", "guest"].includes(user?.role)) {
      delete user.subscription;
      delete user.enrolledWorkouts;
    }

    const newUser = await userModel.create(user);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Benefit
*/
// export const seedBenefit = async (benefit) => {
//   console.log("-- Benefit --");
//   console.log(benefit);
//   console.log("--\n");

//   await dbConnect();

//   try {
//     benefit.image = process.env.SERVER_HOST + benefit.image;
//     const newBenefit = await benefitModel.create(benefit);
//     return newBenefit;
//   } catch (error) {
//     console.log(error);
//   }
// };

/*
    Create new Service
*/
export const seedService = async (service) => {
  console.log("-- Service --");
  console.log(service);
  console.log("--\n");

  await dbConnect();

  try {
    service.image = process.env.SERVER_HOST + service.image;
    service.icon = process.env.SERVER_HOST + service.icon;
    const newService = await serviceModel.create(service);
    return newService;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Review
*/
export const seedReview = async (review) => {
  console.log("-- Review --");
  console.log(review);
  console.log("--\n");

  await dbConnect();

  try {
    const newReview = await reviewModel.create(review);
    return newReview;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Subscription
*/
export const seedSubscription = async (subscription) => {
  console.log("-- Subscription --");
  console.log(subscription);
  console.log("--\n");

  await dbConnect();

  try {
    subscription.image = process.env.SERVER_HOST + subscription.image;
    const newSubscription = await subscriptionModel.create(subscription);
    return newSubscription;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Message
*/
export const seedMessage = async (message) => {
  console.log("-- Message --");
  console.log(message);
  console.log("--\n");

  await dbConnect();

  try {
    const newMessage = await messageModel.create(message);
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Employee
*/
export const seedEmployee = async (employee) => {
  console.log("-- Employee --");
  console.log(employee);
  console.log("--\n");

  await dbConnect();

  try {
    employee.image = process.env.SERVER_HOST + employee.image;
    const newEmployee = await employeeModel.create(employee);
    return newEmployee;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Blog
*/
export const seedBlog = async (blog) => {
  console.log("-- Blog --");
  console.log(blog);
  console.log("--\n");

  await dbConnect();

  try {
    blog.image = process.env.SERVER_HOST + blog.image;
    const newBlog = await blogModel.create(blog);
    return newBlog;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Exercise
*/
export const seedExercise = async (exercise) => {
  console.log("-- Exercise --");
  console.log(exercise);
  console.log("--\n");

  await dbConnect();

  try {
    exercise.image = process.env.SERVER_HOST + exercise.image;
    const newExercise = await exerciseModel.create(exercise);
    return newExercise;
  } catch (error) {
    console.log(error);
  }
};

/*
    Create new Workout
*/
export const seedWorkout = async (workout) => {
  console.log("-- Workout --");
  console.log(workout);
  console.log("--\n");

  await dbConnect();

  try {
    const newWorkout = await workoutModel.create(workout);
    return newWorkout;
  } catch (error) {
    console.log(error);
  }
};
