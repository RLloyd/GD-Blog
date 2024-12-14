/*-= src/app/providers.tsx =-*/
"use client";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
