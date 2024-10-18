//try
const express = require('express')
const router = express.Router()
const SingleBook = require('../models/singlebook')
const Book = require('../models/books');  // Ensure the correct path to the Book model
const Language = require('../models/languages');  // Ensure the correct path to the Language model
const Category = require('../models/categories');
router.get('/', async(req, res) => {
   try{
        const singlebook = await SingleBook.find()
        res.json(singlebook)
   }catch(err){
    res.send('Error' + err)
   }
})

router.get('/:id', async(req, res) => {
    try{
         const singlebook = await SingleBook.findById(req.params.id)
         res.json(singlebook)
    }catch(err){
     res.send('Error' + err)
    }
 })

 // singlebookRoutes.js
router.post('/singlebook', async (req, res) => {
    try {
      const { b_id, l_id, c_id } = req.body;
  
      // Check if the provided IDs exist in the related tables
      const books = await Book.findById(b_id);
      const languages = await Language.findById(l_id);
      const categories = await Category.findById(c_id);
  
      if (!books) {
        return res.status(404).json({ message: 'Book not found' });
      }
      if (!languages) {
        return res.status(404).json({ message: 'Language not found' });
      }
      if (!categories) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Create the new singlebook entry
      const newSingleBook = new SingleBook({
        b_id,
        l_id,
        c_id
      });
  
      const savedSingleBook = await newSingleBook.save();
      res.status(201).json(savedSingleBook);
  
    } catch (error) {
      console.error('Error occurred:', error); // Log the error to see what's wrong
      res.status(500).json({ message: error.message || 'An error occurred while creating the SingleBook record' });
    }
  });
  

 module.exports = router