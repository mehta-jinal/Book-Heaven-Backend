const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

router.post('/', async(req, res) => {
    const contact = new Contact({
        email: req.body.email,
        message: req.body.message
    })
    try {
        const newContact = await contact.save()
        res.status(201).json(newContact)
    }
    catch(error){
        res.send('error' +error)
    }
})

module.exports = router;