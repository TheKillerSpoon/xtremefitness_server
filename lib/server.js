// Server Modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
// Routes
import indexRouter from "./routes/mcd/www/index.route.js";
import authRouter from "./routes/auth/auth.js";
import authTokenRouter from "./routes/auth/token.js";
import userRouter from "./routes/users/user.route.js";
import usersRouter from "./routes/users/users.route.js";

import * as path from "path";
import * as url from "url";
import messageRoute from "./routes/messages/message.route.js";
import messagesRouter from "./routes/messages/messages.route.js";
import subscriptionRoute from "./routes/subscriptions/subscription.route.js";
import subscriptionsRouter from "./routes/subscriptions/subscriptions.route.js";
import employeeRouter from "./routes/employees/employee.route.js";
import employeesRouter from "./routes/employees/employees.route.js";
// import benefitRouter from "./routes/benefits/benefit.route.js";
// import benefitsRouter from "./routes/benefits/benefits.route.js";
import serviceRouter from "./routes/services/service.route.js";
import servicesRouter from "./routes/services/services.route.js";
import reviewRoute from "./routes/reviews/review.route.js";
import reviewsRouter from "./routes/reviews/reviews.route.js";
import blogRouter from "./routes/blogs/bLOG.route.js";
import blogsRouter from "./routes/blogs/blogs.route.js";
import exerciseRouter from "./routes/exercises/exercise.route.js";
import exercisesRouter from "./routes/exercises/exercises.route.js";
import workoutsRouter from "./routes/workouts/workouts.route.js";
import workoutRouter from "./routes/workouts/workout.route.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const expressServer = express();

expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(cors());
expressServer.use(cookieParser());

// Serve static files from the public and www directories.
expressServer.use(express.static("[mcd]"));
expressServer.use(express.static("public"));
expressServer.use(express.static("sites"));

/*

  Routes

*/

// Index Client Frontend Routes
expressServer.use(indexRouter);

// Backend API Routes
expressServer.use(authRouter);
expressServer.use(authTokenRouter);

// Backend API Users Routes
expressServer.use(usersRouter);
expressServer.use(userRouter);

// Benefits Routes
// expressServer.use(benefitRouter);
// expressServer.use(benefitsRouter);

// Messages Routes
expressServer.use(messageRoute);
expressServer.use(messagesRouter);

// Reviews Routes
expressServer.use(reviewRoute);
expressServer.use(reviewsRouter);

// Employees Routes
expressServer.use(employeeRouter);
expressServer.use(employeesRouter);

// Services Routes
expressServer.use(serviceRouter);
expressServer.use(servicesRouter);

// Subscriptions Routes
expressServer.use(subscriptionRoute);
expressServer.use(subscriptionsRouter);

// Blogs Routes
expressServer.use(blogRouter);
expressServer.use(blogsRouter);

// Exercises Routes
expressServer.use(exerciseRouter);
expressServer.use(exercisesRouter);

// Workouts Routes
expressServer.use(workoutRouter);
expressServer.use(workoutsRouter);

const sitePaths = ["poc", "preview", "www", "vanilla"];
sitePaths.forEach((site) => {
  expressServer.use(express.static(path.join(__dirname, "../sites", site)));
  expressServer.use((req, res, next) => {
    res.sendFile(
      path.join(__dirname, "../sites", site, "index.html"),
      (err) => {
        if (err) next();
      }
    );
  });
});
export default expressServer;
