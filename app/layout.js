import Link from "next/link";
import { HomeIcon, FolderIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4">
          <h1 className="text-lg font-bold mb-4">QR Analytics</h1>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <HomeIcon className="h-5 w-5" /> Dashboard
            </Link>
            <Link
              href="/campaigns"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <FolderIcon className="h-5 w-5" /> Campaigns
            </Link>
            <Link
              href="/links"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <QrCodeIcon className="h-5 w-5" /> Links
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
          {children}
        </main>
      </body>
    </html>
  );
}
