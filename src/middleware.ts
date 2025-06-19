import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.rewrite(new URL(
            `${process.env.API_URL}${req.nextUrl.pathname.replace("/api", "")}${req.nextUrl.search}`
        ), {request: req})
    }
}

export const config = {
    matcher: ["/api/:path*"]
} satisfies MiddlewareConfig