"use client";

import QueryProvider from "@/providers/query-provider";

export default function AppProvider({ children }) {
  return <QueryProvider>{children}</QueryProvider>;
}
