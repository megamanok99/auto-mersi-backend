import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
const app = express();
app.use(cors());

let transporter = nodemailer.createTransport({
  host: 'mail.hostland.ru',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
let mailOptions = {
  from: 'sale@auto-mersi.ru',
  to: 'megamanok99@gmail.com',
  subject: 'Прикинь,это отправлено с почтового сервера',
  text: 'оно работает',
};

app.get('/test', (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('here');
      return console.log(error);
    }
    console.log('Сообщение отправлено: %s', info.messageId);
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('running server');
  }
});
