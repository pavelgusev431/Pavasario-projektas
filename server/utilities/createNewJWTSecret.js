import {nanoid} from "nanoid";
import sha256 from "js-sha256";
import fs from "fs";
import os from "os";

const newSecret = () => {
    const string = nanoid(64);
    const hash = sha256(string);
    return hash;
}

const setEnvValue = (key, value) => {
  const ENV_VARS = fs.readFileSync(".env", "utf8").split(os.EOL);
  const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
    const keyValRegex = new RegExp(`(?<!#\\s*)${key}(?==)`);
    return line.match(keyValRegex);
  }));
  if (target !== -1) {
    ENV_VARS.splice(target, 1, `${key}=${value}`);
  } else {
    ENV_VARS.push(`${key}=${value}`);
  }
  fs.writeFileSync(".env", ENV_VARS.join(os.EOL));
}

const secret = newSecret();
setEnvValue("JWT_SECRET", secret);
console.log("\x1b[34mNew env var \x1b[31m\"JWT_SECRET\"\x1b[34m created.\x1b[0m");