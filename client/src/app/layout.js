import { Toaster } from "react-hot-toast";

import AppProvider from "@/providers/app-provider";

import "./globals.css";

export const metadata = {
  title: "TMBill Order Management",
  description: "Multi-store order management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}

          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={10}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "10px",
                background: "#111827",
                color: "#fff",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}