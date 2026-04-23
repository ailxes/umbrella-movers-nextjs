import dynamic from "next/dynamic";

// Disable SSR — Radix UI Select components require browser APIs
export default dynamic(() => import("./AdminClient"), { ssr: false });
