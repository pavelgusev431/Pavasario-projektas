import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const nodemailerTest = () => {
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
 * Email sender function (async)
 * @param link link to the page for password recovery
 * @param email email to send the message to
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
