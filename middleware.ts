import NextAuth from "next-auth";
import authConfig from "./auth.config";

const authRoutes = ["/auth/login", "/auth/register", "/api/auth"];
const protectedRoutes = ["/dashboard", "/settings", "/generate-meal-plan"];

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log(req.auth);
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/auth/login", req.url));
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
