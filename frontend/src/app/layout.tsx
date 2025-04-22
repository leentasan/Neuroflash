import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuroFlash - AI-powered Flashcards",
  description: "Learn smarter with AI-powered flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
          <div className="font-bold text-xl">LOGO</div>
          <nav className="flex space-x-8">
            <a href="#" className="hover:text-gray-500">Dashboard</a>
            <a href="#" className="hover:text-gray-500">Flashcards</a>
            <a href="#" className="hover:text-gray-500">Quizzes</a>
            <a href="#" className="hover:text-gray-500">Analytics</a>
          </nav>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-300"></div>
            <div className="h-6 w-6 rounded-full bg-red-300"></div>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-white py-8 px-6 border-t">
          <div className="container mx-auto grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">NeuroFlash</h3>
              <p className="text-sm text-gray-600">AI-powered learning platform</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Flashcards</li>
                <li>Quizzes</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <p className="text-sm text-gray-600">Social Media</p>
              <p className="text-sm text-gray-600 mt-6">Copyright</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}