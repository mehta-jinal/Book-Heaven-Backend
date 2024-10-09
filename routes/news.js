const express = require('express')
const router = express.Router()
const News = require('../models/news')

router.post('/', async(req, res) => {
    const news = new News({
        email: req.body.email
    })
    try {
        const newNews = await news.save()
        res.status(201).json(newNews)
    }
    catch(error){
        res.send('error' +error)
    }
})

module.exports = router;