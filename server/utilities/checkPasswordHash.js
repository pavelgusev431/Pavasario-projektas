// @ts-check
import { sha1 } from 'js-sha1';
import { sha256 } from 'js-sha256';

/**@type {string}*/
const password = 'Admin123.';
/**@type {string}*/
const hashedPassword = sha256(sha1(password));

console.log(hashedPassword);
