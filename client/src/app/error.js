"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                    Something went wrong
                </p>

                <h1 className="mt-3 text-3xl font-bold text-gray-900">
                    Unexpected Error
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                    An unexpected error occurred while loading this page. Please
                    try again.
                </p>

                {process.env.NODE_ENV === "development" && error?.message ? (
                    <div className="mt-6 rounded-lg bg-gray-100 p-4 text-left">
                        <p className="wrap-break-word font-mono text-sm text-red-700">
                            {error.message}
                        </p>
                    </div>
                ) : null}

                <button
                    type="button"
                    onClick={reset}
                    className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}