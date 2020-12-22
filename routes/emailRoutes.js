// Requiring Modules
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const router = express.Router();
const Email = require('../model/email');
const transporter = require('../emails/transporter');

// POST Route - Creating Emails in the DB and scheduling it
router.post('/', (req, res) => {
    const email = new Email({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    });

    email.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.json({ message: err });
        })

    //Creating Transport
    transporter;

    // Email message Option
    const mailOptions = {
        from: req.body.from,// 'liam.shanahan65@ethereal.email',//sender's email
        to: req.body.to,//receiver's email
        subject: req.body.subject,
        text: req.body.text
    }

    // Scheduling Email
    cron.schedule('* * * * * *', () => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Email Sent: ${info.response}`)
            }
        })
    });
});

// Reading Email
router.get('/', (req, res) => {
    Email.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})


// Updating Email
router.patch('/:id', (req, res) => {
    Email.updateOne({ _id: req.params.id },
        {
            $set: {
                subject: req.body.subject
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.json({ message: err })
        })
 
    transporter;

    const mailOptions = {
        from: req.body.from,// 'liam.shanahan65@ethereal.email',//sender's email
        to: req.body.to,//receiver's email
        subject: req.body.subject,
        text: req.body.text
    }

    // Scheduling Email
    cron.schedule('* * * * * *', () => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Email Sent: ${info.response}`)
            }
        })
    });
})

//Deleting Email
router.delete('/:id', (req, res) => {
    Email.remove({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => res.json({message: err}))
})
//Exporting Router
module.exports = router;