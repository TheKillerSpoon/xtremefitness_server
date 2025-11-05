import {
  stubUsers,
  stubEmployees,
  // stubBenefits,
  stubServices,
  stubReviews,
  stubMessages,
  stubBlogs,
  stubExercises,
  stubWorkouts,
  stubSubscriptions,
} from "./seed.data.js";
import {
  seedService,
  seedUser,
  seedEmployee,
  // seedBenefit,
  seedMessage,
  seedBlog,
  seedExercise,
  seedReview,
  seedWorkout,
  seedSubscription,
} from "./seed.helper.js";

// SEED USERS
export const seedUsers = async () => {
  for (let i = 0; i < stubUsers.length; i++) {
    await seedUser(stubUsers[i]);
  }
};

// SEED BENEFITS
// export const seedBenefits = async () => {
//   for (let i = 0; i < stubBenefits.length; i++) {
//     await seedBenefit(stubBenefits[i]);
//   }
// };

// SEED SERVICES
export const seedServices = async () => {
  for (let i = 0; i < stubServices.length; i++) {
    await seedService(stubServices[i]);
  }
};

// SEED REVIEWS
export const seedReviews = async () => {
  for (let i = 0; i < stubReviews.length; i++) {
    await seedReview(stubReviews[i]);
  }
};

// SEED SUBSCRIPTIONS
export const seedSubscriptions = async () => {
  for (let i = 0; i < stubSubscriptions.length; i++) {
    await seedSubscription(stubSubscriptions[i]);
  }
};

// SEED EMPLOYEES
export const seedEmployees = async () => {
  for (let i = 0; i < stubEmployees.length; i++) {
    await seedEmployee(stubEmployees[i]);
  }
};

// SEED MESSAGES
export const seedMessages = async () => {
  for (let i = 0; i < stubMessages.length; i++) {
    await seedMessage(stubMessages[i]);
  }
};

// SEED BLOGS
export const seedBlogs = async () => {
  for (let i = 0; i < stubBlogs.length; i++) {
    await seedBlog(stubBlogs[i]);
  }
};

// SEED EXERCISES
export const seedExercises = async () => {
  for (let i = 0; i < stubExercises.length; i++) {
    await seedExercise(stubExercises[i]);
  }
};

// SEED WORKOUTS
export const seedWorkouts = async () => {
  for (let i = 0; i < stubWorkouts.length; i++) {
    await seedWorkout(stubWorkouts[i]);
  }
};
