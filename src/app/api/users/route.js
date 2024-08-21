import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const GET = async () => {
    try {
        await connect();

        const user = await User.find();
        return new NextResponse(JSON.stringify(user), { status: 200 });

    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};






