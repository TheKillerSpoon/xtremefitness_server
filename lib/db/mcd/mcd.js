import {
  // seedBenefits,
  seedBlogs,
  seedEmployees,
  seedExercises,
  seedMessages,
  seedReviews,
  seedServices,
  seedSubscriptions,
  seedUsers,
  seedWorkouts,
} from "./seed/seed.mjs";

console.log("----------------------");
console.log("Media College Viborg");
console.log("Seeding files");
console.log("----------------------\n");

const start = Date.now();

async function run() {
  try {
    // Korrekt rækkefølge så relationer findes, når users oprettes
    await seedSubscriptions();
    await seedWorkouts();
    await seedUsers();

    // Resten kan køre parallelt
    await Promise.all([
      // seedBenefits(),
      seedServices(),
      seedReviews(),
      seedEmployees(),
      seedMessages(),
      seedBlogs(),
      seedExercises(),
    ]);

    const ms = Date.now() - start;
    console.log("\n----------------------");
    console.log("Seeding files completed");
    console.log(`Duration: ${ms} ms`);
    console.log("----------------------");
    process.exit(0);
  } catch (err) {
    console.error("\n[SEED ERROR]");
    console.error(err?.stack || err);
    process.exit(1);
  }
}

await run();
