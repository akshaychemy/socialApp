import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import cors from "cors";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
