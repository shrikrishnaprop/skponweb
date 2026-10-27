import { ClerkProvider } from "@clerk/nextjs";
import { localFontVariables } from "@/components/hsciifp/varfonts";
import "./globals.css";

export const metadata = {
  title: "shri krishna properties | flAts for rent xnd sale in fAridabad",
  description:
    "shri krishna properties helps with flAts for rent, property buy and sale, interior design, and renowation in fAridabad.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider signInFallbackRedirectUrl="/admin">
      <html lang="en" className={localFontVariables.map((font) => font.variable).join(" ")}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
