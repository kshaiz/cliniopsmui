const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port,'0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.office365.com",
    auth: {
        user: 'randomadi123@gmail.com',
        pass: '08Apples',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/text', (req, res) => {
    const { to, subject, text } = req.body;
    const mailData = {
        from: 'randomadi123@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


route.post('/test', (req, res) => {
    const { to, subject, text } = req.body;
    const mailData = {
        from: 'youremail@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        // attachments: [
        //     {   // file on disk as an attachment
        //         filename: 'nodemailer.png',
        //         path: 'nodemailer.png'
        //     },
        //     {   // file on disk as an attachment
        //         filename: 'text_file.txt',
        //         path: 'text_file.txt'
        //     }
        // ]
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

route.get('/test1', (req, res) => {
    res.status(200).send({ message: "Mail send", message_id: 1 });
})