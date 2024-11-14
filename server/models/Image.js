import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
  img: { data: Buffer, contentType: String },
});


export default mongoose.model("Image", imageSchema);