
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";



export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        await User.findByIdAndDelete(id);
        return new NextResponse("Usuario ha sido Eliminado", { status: 200 });
    } catch (err) {
        return new NextResponse("Error de base de datos", { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    const { id } = params;
    const body = await request.json();

    try {
        await connect();

        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

        return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};