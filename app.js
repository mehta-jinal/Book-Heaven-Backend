const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const url = 'mongodb://localhost/Book-Heaven-DB'

const app = express()

mongoose.connect(url ,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected to MongoDB')
})
app.use(cors());
app.use(express.json())

const booksRouter = require('./routes/books')
app.use('/books', booksRouter);

const languagesRouter = require('./routes/languages');
app.use('/languages', languagesRouter);

const newsRouter = require('./routes/news');
app.use('/news', newsRouter);

const categoriesRouter = require('./routes/categories');
app.use('/categories', categoriesRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

app.listen(1003, () => {
    console.log('Server is running on port 1003')
})