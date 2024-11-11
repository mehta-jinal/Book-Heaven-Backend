const express = require('express')
const router = express.Router()
const Book = require('../models/books')
router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (err) {
        res.send('Error' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (err) {
        res.send('Error' + err)
    }
})

router.post('/', async (req, res) => {
    const books = new Book({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        image: req.body.image,
        pub_date: req.body.pub_date,
        l_id: req.body.l_id,
        c_id: req.body.c_id,
        downloadLink: req.body.downloadLink,
    })

    //   if (!languages) {
    //     return res.status(404).json({ message: 'Language not found' });
    //   }
    //   if (!categories) {
    //     return res.status(404).json({ message: 'Category not found' });
    //   }

    // Create the new bookdata entry
    //   const newBookdata = new Bookdata({
    //     l_id,
    //     c_id
    //   });

    //   const savedBookdata = await newBookdata.save();
    //   res.status(201).json(savedBookdata);
    try {
        const b1 = await books.save()
        res.json(books)
    } catch (err) {
        res.send('Error' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(book)
    } catch (err) {
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id, req.body)
        res.send('Data Removed!')
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router