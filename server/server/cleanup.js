import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const cleanup = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const images = path.join(__dirname, "..", "public", "images");
  fs.rmSync(images, { recursive: true, force: true }, (error) => {
    throw new Error(error);
  });
  if (!fs.existsSync(images))
    fs.mkdirSync(images, { force: true }, (error) => {
      throw new Error(error);
    });
};

export default cleanup;
