const express = require('express');
const router = express.Router()
const Language = require('../models/languages')

router.get('/', async(req, res) => {
    try {
        const languages = await Language.find()
        res.json(languages)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/', async(req, res) => {
    const language = new Language({
        name: req.body.name
    })
    try {
        const newLanguage = await language.save()
        res.status(201).json(newLanguage)
    }
    catch(error){
        res.send('error' +error)
    }
})

module.exports = router;