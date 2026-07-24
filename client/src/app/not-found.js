import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    404 Error
                </p>

                <h1 className="mt-3 text-3xl font-bold text-gray-900">
                    Page not found
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                    The page you are looking for does not exist or may have been
                    moved.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href={ROUTES.ORDERS}
                        className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Go to Orders
                    </Link>

                    <Link
                        href={ROUTES.ANALYTICS}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        View Analytics
                    </Link>
                </div>
            </div>
        </main>
    );
}