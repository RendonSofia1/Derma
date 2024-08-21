import mongoose from "mongoose";

const {Schema} = mongoose;

const postSchema = new Schema (
    {
        clasificacion:{
            type: String,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        precio:{
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);