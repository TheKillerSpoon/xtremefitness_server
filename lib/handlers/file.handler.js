import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const deleteFile = async (image) => {
  if (!image) return;

  try {
    let imgPath = image.replace(process.env.SERVER_HOST, "");

    let absolutePath = path.join(__dirname, "../../public" + imgPath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`Deleted image: ${absolutePath}`);
    } else {
      console.log(`File not found: ${absolutePath}`);
    }
  } catch (error) {
    console.error(`Failed to delete file: ${image}`, error);
  }
};

// USER
export const deleteUserImage = async (imagePath) => {
  if (!imagePath || imagePath.includes("no-user.jpg")) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

// BENEFIT
export const deleteBenefitImage = async (imagePath) => {
  if (
    !imagePath ||
    imagePath.includes("no-image.png") ||
    imagePath.includes("benefit_1.png") ||
    imagePath.includes("benefit_2.png") ||
    imagePath.includes("benefit_3.png") ||
    imagePath.includes("benefit_4.png")
  ) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

// SERVICE
export const deleteServiceImage = async (imagePath) => {
  if (
    !imagePath ||
    imagePath.includes("no-image.png") ||
    imagePath.includes("service_1.png") ||
    imagePath.includes("service_2.png") ||
    imagePath.includes("service_3.png") ||
    imagePath.includes("service_4.png")
  ) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

// BLOG
export const deleteBlogImage = async (imagePath) => {
  if (
    !imagePath ||
    imagePath.includes("no-image.png") ||
    imagePath.includes("blog_1.png") ||
    imagePath.includes("blog_2.png") ||
    imagePath.includes("blog_3.png")
  ) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

// EMPLOYEE
export const deleteEmployeeImage = async (imagePath) => {
  if (
    !imagePath ||
    imagePath.includes("no-image.png") ||
    imagePath.includes("team_member_1.png") ||
    imagePath.includes("team_member_2.png") ||
    imagePath.includes("team_member_3.png") ||
    imagePath.includes("team_member_4.png") ||
    imagePath.includes("team_member_5.png") ||
    imagePath.includes("team_member_6.png")
  ) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

// EXERCISE
export const deleteExerciseImage = async (imagePath) => {
  if (
    !imagePath ||
    imagePath.includes("no-image.png") ||
    imagePath.includes("provide_1.png") ||
    imagePath.includes("provide_2.png") ||
    imagePath.includes("provide_3.png") ||
    imagePath.includes("provide_4.png")
  ) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

// SUBSCRIPTION
export const deleteSubscriptionImage = async (imagePath) => {
  if (
    !imagePath ||
    imagePath.includes("no-image.png") ||
    imagePath.includes("pricing_tables_1.png") ||
    imagePath.includes("pricing_tables_2.png") ||
    imagePath.includes("pricing_tables_3.png")
  ) {
    return;
  }

  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};
