const express = require('express');
const router = express.Router()
const Category = require('../models/categories')

router.get('/', async(req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/', async(req, res) => {
    const category = new Category({
        c_name: req.body.c_name
    })
    try {
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    }
    catch(error){
        res.send('error' +error)
    }
})

module.exports = router;