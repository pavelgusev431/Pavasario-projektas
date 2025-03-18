import {body} from "express-validator"

const validateLoginUser = [
    body("username")
    .isEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string"),

    body("password")
    .isEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
];

export default validateLoginUser;