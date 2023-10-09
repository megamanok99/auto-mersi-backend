import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', (req, res) => {
  console.log(`req`, req.body);
  let transporter = nodemailer.createTransport({
    host: 'mail.hostland.ru',
    port: 587,
    secure: false,
    auth: {
      user: req.body.user,
      pass: req.body.pass,
    },
  });
  let mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('here');
      return res.send('message not sended');
    }

    console.log('Сообщение отправлено: %s', info.messageId);
    return res.send('message sended');
  });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(4445, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('running server');
  }
});
