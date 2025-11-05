import multer from "multer";
import { getNewUID } from "./helpers.js";
import * as mime from "mime-types";

// BENEFIT
export const benefitStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/benefits");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

// USER
export const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

// BLOG
export const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/blogs");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

// SERVICE
export const serviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "icon") {
      cb(null, "public/services/service_icons");
    } else {
      cb(null, "public/services");
    }
  },
  filename: (req, file, cb) => {
    const ext =
      mime.extension(file.mimetype) || path.extname(file.originalname).slice(1);
    cb(null, `${getNewUID()}.${ext}`);
  },
});

// EMPLOYEE
export const employeeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/employees");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

// EXERCISE
export const exerciseStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/exercises");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

// EXERCISE
export const subscriptionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/subscriptions");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});
