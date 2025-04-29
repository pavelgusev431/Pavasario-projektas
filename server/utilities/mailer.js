// @ts-check
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
/**@type {string | undefined}*/
const EMAIL_HOST = process.env.EMAIL_HOST;
/**@type {string | undefined}*/
const EMAIL_PORT = process.env.EMAIL_PORT;
/**@type {string | undefined}*/
const EMAIL_USER = process.env.EMAIL_USER;
/**@type {string | undefined}*/
const EMAIL_PASS = process.env.EMAIL_PASS;

/**@type {object}*/
const transport = {
    /**@type {string | undefined}*/
    host: EMAIL_HOST,
    /**@type {string | undefined}*/
    port: EMAIL_PORT,
    /**@type {boolean}*/
    secure: false,
    /**@type {object}*/
    auth: {
        /**@type {string | undefined}*/
        user: EMAIL_USER,
        /**@type {string | undefined}*/
        pass: EMAIL_PASS,
    },
};

/**@type {nodemailer.Transporter}*/
const transporter = nodemailer.createTransport(transport);

const nodemailerTest = () => {
    console.log('\x1b[33mStarting email connection test...\x1b[0m');
    transporter.verify((error) => {
        if (error) {
            console.log(
                `\x1b[0mNodemailer: \x1b[31mNo internet connection to send emails\x1b[0m\n`
            );
            return false;
        } else {
            console.log(
                `\x1b[0mNodemailer: \x1b[32mConnection to email server established\x1b[0m`
            );
            return true;
        }
    });
};

/**
 * @param {string} link
 * @param {string} email
 */
const sendEmail = async (link, email) => {
    await transporter.sendMail({
        from: 'JustDoIt <justdoitserviceemail@gmail.com>',
        to: email,
        subject: 'Slaptažodžio keitimas',
        text: '',
        html: `<p>Norėdami pakeisti savo paskyros slaptažodį paspauskite <a href="${link}">cia</a>.</p>`,
    });
};

export { sendEmail, nodemailerTest };
