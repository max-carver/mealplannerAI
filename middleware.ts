import NextAuth from "next-auth";
import authConfig from "./auth.config";

const authRoutes = ["/login", "/register", "/reset-password", "/api/auth"];
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

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
    return Response.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
