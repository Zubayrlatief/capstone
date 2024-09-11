import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/itemsRouter.js';
import usersRouter from './routes/usersRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));

// Use CORS middleware with options
app.use(cors({
  origin: 'http://localhost:8080', // Replace with the origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static('public'));
app.use(express.json());

app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
