const { Router } = require('express');
const router = Router();

const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const response = await Book.find();
  res.json(response);
});

router.post('/', async (req, res) => {
  const { title, author, isbn } = req.body;
  const newBook = new Book({ title, author, isbn });
  await newBook.save();
  res.json({ message: 'Book saved' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.send({ message: 'Book deleted' });
});

module.exports = router;
