export { default } from "next-auth/middleware";

// On définit les routes qui nécessitent d'être connecté
export const config = { 
  matcher: [
    "/dashboard/:path*", // Bloque tout ce qui commence par /dashboard
    // Tu pourras ajouter d'autres routes privées ici plus tard
  ] 
};