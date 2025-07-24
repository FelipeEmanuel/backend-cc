import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import produtoRouter from './routes/produtoRouter';
import queryStringsParser from 'query-strings-parser';

dotenv.config();

const port = process.env.PORT || 80;

// Conectar ao banco de dados
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(queryStringsParser({
    use_page: true,
    default: {
        pagination: { page: 1, limit: Number.MAX_SAFE_INTEGER }
    }
}))
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEADER', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Type', 'X-Total-Count'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use('/v1/produtos', produtoRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));