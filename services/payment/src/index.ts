import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import paymentRoutes from './routes/payment.js';


dotenv.config();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
    throw new Error('Missing Razorpay credentials. Set RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET (or RAZORPAY_KEY/RAZORPAY_SECRET).');
}

export const instance = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Payment service is running on port ${process.env.PORT}`);
});