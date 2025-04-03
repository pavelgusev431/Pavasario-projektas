import { sha1 } from 'js-sha1';
import { sha256 } from 'js-sha256';

const password = 'Admin123.';
const hashedPassword = sha256(sha1(password));

console.log(hashedPassword);
