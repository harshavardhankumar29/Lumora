import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import jwt from 'jsonwebtoken';
import paymentRoutes from './routes/payment.js';


dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Payment service is running on port ${process.env.PORT}`);
});