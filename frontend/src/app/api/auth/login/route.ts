import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: "Usuário ou senha inválidos" },
                { status: response.status }
            );
        }

        const data = await response.json();

        const nextResponse = NextResponse.json({
            success: true,
            user: data.user,
        });

        nextResponse.cookies.set("token", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return nextResponse;

    } catch (error) {
        return NextResponse.json(
            { message: "Erro interno" },
            { status: 500 }
        );
    }
}