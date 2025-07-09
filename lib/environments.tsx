export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("BACKEND_URL:", NEXT_PUBLIC_BACKEND_URL);
if (!NEXT_PUBLIC_BACKEND_URL) {
  console.error("NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables.");
}