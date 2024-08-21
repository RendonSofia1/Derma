

import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const GET = async (request, { params }) => {
  const { email } = params;

  try {
    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Usuario no encontrado", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error("Error de base de datos:", err);
    return new NextResponse("Error de base de datos", { status: 500 });
  }
};
