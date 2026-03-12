import express from "express";
import cloudinary from "cloudinary";

const router = express.Router();

router.post("/upload", async (req, res) => {
    try {
        const { buffer ,public_id } = req.body;

        if (public_id) {
            // Delete the existing file from Cloudinary
            await cloudinary.v2.uploader.destroy(public_id);
        }
        // Upload the new file to Cloudinary
        const cloud = await cloudinary.v2.uploader.upload(buffer);

        res.json({
            url: cloud.secure_url,
            public_id: cloud.public_id  
        })
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
