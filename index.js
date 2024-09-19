import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/itemsRouter.js';
import usersRouter from './routes/usersRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = ['http://localhost:8080', 'https://capstone-965d2.web.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/api', cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
