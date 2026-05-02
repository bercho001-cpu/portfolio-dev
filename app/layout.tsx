// app/layout.tsx

  // Rest of the code
  
// app/layout.tsx

  // Rest of the code
  
// app/layout.tsx

  // Rest of the code
  
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fernando Soria - Portfolio",
  description: "Portfolio of Fernando Soria, a Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body suppressHydrationWarning>{children}</body>
      </ThemeProvider>
    </html>
  );
}
