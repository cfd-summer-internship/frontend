import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api")) {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("Rewriting to backend:", backendUrl + req.nextUrl.pathname.replace("/api", "") + req.nextUrl.search);
        return NextResponse.rewrite(new URL(
            `${backendUrl}${req.nextUrl.pathname.replace("/api", "")}${req.nextUrl.search}`
        ), { request: req })
    }
}

export const config = {
    matcher: ["/api/:path*"]
} satisfies MiddlewareConfig