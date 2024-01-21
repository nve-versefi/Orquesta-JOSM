const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host :'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: 'alonsete.tyr@gmail.com', 
    pass: 'rdps uxth nlmc vzxf', 
  },
});

transporter.verify().then(() => {
  console.log("chachi");
});

router.post('/enviar-correo', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configuración del correo
  const mailOptions1 = {
    from: 'alonsete.tyr@gmail.com', 
    to: 'alonso.sanz@educa.madrid.org', 
    subject: 'Nuevo mensaje desde el formulario',
    html: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    // Cambia la respuesta en tu servidor
    res.status(200).json({ message: 'Correo enviado', info: info.response });
  });

  const mailOptions2 = {
    from: 'alonsete.tyr@gmail.com',
    to: email, 
    subject: 'Nuevo mensaje desde la JOsM',
    html: `Gracias por contactar con la JOsM, ya hemos enviado toda la informacion `,
  };

  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    // Cambia la respuesta en tu servidor
    res.status(200).json({ message: 'Correo enviado', info: info.response });
  });
});


module.exports = router;
