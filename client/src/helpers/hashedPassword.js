import { sha256 } from "js-sha256";
import { sha1 } from "js-sha1";

export function hashPassword(password, username) {
  // const now = new Date();
  // const salt = sha256(sha1(now.toString() + username));
  const hashed = sha256(sha1(password ));
  return hashed;
}
