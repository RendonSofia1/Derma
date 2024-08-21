import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, {params}) => {
    const{id} = params;

    try{
        await connect();
        const post = await Post.findById(id);

        return new NextResponse(JSON.stringify(post),{status: 200});
    }catch (err){
        return new NextResponse("Database Error", {status: 500});
    }
};

export const DELETE = async (request, {params}) => {
    const {id} = params;

    try {
        await connect();

        await Post.findByIdAndDelete(id);
        return new NextResponse("Post ha sido Eliminado", {status: 200});
    }catch(err){
        return new NextResponse("Database Error", {status: 500});
    }
};

export const PUT = async (request, { params }) => {
    const { id } = params;
    const body = await request.json();

    try {
        await connect();

        // Encuentra el post por ID y actualiza los campos proporcionados en el cuerpo de la solicitud
        const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });

        return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};