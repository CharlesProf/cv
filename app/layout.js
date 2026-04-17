import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading"
});

export const metadata = {
  title: "Charles Wilbert | CV",
  description: "Personal CV website built with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
