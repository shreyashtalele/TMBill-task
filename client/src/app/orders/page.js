"use client";

import {
    ChartNoAxesCombined,
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    Plus,
    RefreshCw,
    Search,
    Store,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header";
import OrdersEmptyState from "@/components/orders/orders-empty-state";
import OrderSummaryCards from "@/components/orders/order-summary-cards";
import OrdersTable from "@/components/orders/orders-table";
import OrdersTableSkeleton from "@/components/orders/orders-table-skeleton";
import { APP_CONFIG } from "@/constants/app-config";
import { ROUTES } from "@/constants/routes";
import { useOrderSocket } from "@/hooks/use-order-socket";
import { useOrders } from "@/hooks/use-orders";
import { getApiError } from "@/utils/get-api-error";

export default function OrdersPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedStoreId, setSelectedStoreId] = useState(
        APP_CONFIG.DEFAULT_STORE_ID,
    );

    const [storeIdInput, setStoreIdInput] = useState(
        String(APP_CONFIG.DEFAULT_STORE_ID),
    );

    const [storeIdError, setStoreIdError] = useState("");

    useOrderSocket(selectedStoreId);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useOrders({
        storeId: selectedStoreId,
        page: currentPage,
        limit: APP_CONFIG.ORDERS_PAGE_LIMIT,
    });

    const orders = data?.data?.orders ?? [];
    const pagination = data?.data?.pagination;

    const totalPages = Math.max(
        Number(pagination?.totalPages) || 1,
        1,
    );

    const totalRecords =
        Number(pagination?.totalRecords) || 0;

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    const firstVisibleOrder =
        totalRecords === 0
            ? 0
            : (currentPage - 1) *
            APP_CONFIG.ORDERS_PAGE_LIMIT +
            1;

    const lastVisibleOrder = Math.min(
        currentPage * APP_CONFIG.ORDERS_PAGE_LIMIT,
        totalRecords,
    );

    const handleStoreSearch = (event) => {
        event.preventDefault();

        const parsedStoreId = Number(storeIdInput);

        if (
            !Number.isInteger(parsedStoreId) ||
            parsedStoreId <= 0
        ) {
            setStoreIdError(
                "Please enter a valid Store ID greater than 0.",
            );

            return;
        }

        setStoreIdError("");
        setCurrentPage(1);
        setSelectedStoreId(parsedStoreId);
    };

    const handleStoreIdChange = (event) => {
        setStoreIdInput(event.target.value);

        if (storeIdError) {
            setStoreIdError("");
        }
    };

    const handlePreviousPage = () => {
        if (isFirstPage || isFetching) {
            return;
        }

        setCurrentPage((previousPage) =>
            Math.max(previousPage - 1, 1),
        );
    };

    const handleNextPage = () => {
        if (isLastPage || isFetching) {
            return;
        }

        setCurrentPage((previousPage) =>
            Math.min(previousPage + 1, totalPages),
        );
    };

    return (
        <PageContainer>
            <PageHeader
                title="Orders"
                description="View, track and manage all store orders."
                action={
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            href={ROUTES.ANALYTICS}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                            <ChartNoAxesCombined size={17} aria-hidden="true" />
                            View Analytics
                        </Link>

                        <Link
                            href={ROUTES.NEW_ORDER}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                        >
                            <Plus size={17} aria-hidden="true" />
                            Create Order
                        </Link>
                    </div>
                }
            />

            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                <Store
                                    size={18}
                                    aria-hidden="true"
                                />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Filter by Store
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Enter a Store ID to view
                                    its orders.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleStoreSearch}
                        className="flex w-full flex-col gap-3 sm:flex-row sm:items-start lg:w-auto"
                    >
                        <div className="w-full sm:w-64">
                            <label
                                htmlFor="store-id"
                                className="sr-only"
                            >
                                Store ID
                            </label>

                            <input
                                id="store-id"
                                type="number"
                                min="1"
                                step="1"
                                value={storeIdInput}
                                onChange={
                                    handleStoreIdChange
                                }
                                placeholder="Enter Store ID"
                                aria-invalid={Boolean(
                                    storeIdError,
                                )}
                                aria-describedby={
                                    storeIdError
                                        ? "store-id-error"
                                        : undefined
                                }
                                className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${storeIdError
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-slate-900 focus:ring-slate-200"
                                    }`}
                            />

                            {storeIdError ? (
                                <p
                                    id="store-id-error"
                                    className="mt-1.5 text-sm text-red-600"
                                >
                                    {storeIdError}
                                </p>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            disabled={
                                isFetching ||
                                storeIdInput.trim() === ""
                            }
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isFetching ? (
                                <LoaderCircle
                                    size={17}
                                    className="animate-spin"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Search
                                    size={17}
                                    aria-hidden="true"
                                />
                            )}

                            {isFetching
                                ? "Loading..."
                                : "Search Store"}
                        </button>
                    </form>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-600">
                        Currently showing orders for{" "}
                        <span className="font-semibold text-slate-900">
                            Store {selectedStoreId}
                        </span>
                    </p>
                </div>
            </section>

            {isLoading ? (
                <OrdersTableSkeleton />
            ) : null}

            {isError ? (
                <section
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 shadow-sm"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
                            <RefreshCw
                                size={19}
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-red-800">
                                Unable to load orders
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-red-700">
                                {getApiError(error)}
                            </p>

                            <button
                                type="button"
                                onClick={() => refetch()}
                                disabled={isFetching}
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isFetching ? (
                                    <LoaderCircle
                                        size={17}
                                        className="animate-spin"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <RefreshCw
                                        size={17}
                                        aria-hidden="true"
                                    />
                                )}

                                {isFetching
                                    ? "Retrying..."
                                    : "Retry"}
                            </button>
                        </div>
                    </div>
                </section>
            ) : null}

            {!isLoading &&
                !isError &&
                orders.length === 0 ? (
                <OrdersEmptyState />
            ) : null}

            {!isLoading &&
                !isError &&
                orders.length > 0 ? (
                <>
                    <OrderSummaryCards orders={orders} />

                    <div className="relative mt-6">
                        <div
                            className={
                                isFetching
                                    ? "opacity-60 transition-opacity"
                                    : "transition-opacity"
                            }
                        >
                            <OrdersTable
                                orders={orders}
                            />
                        </div>

                        {isFetching ? (
                            <div
                                className="pointer-events-none absolute inset-0 flex items-start justify-center pt-6"
                                aria-live="polite"
                            >
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                                    <LoaderCircle
                                        size={16}
                                        className="animate-spin"
                                        aria-hidden="true"
                                    />
                                    Refreshing orders
                                </span>
                            </div>
                        ) : null}
                    </div>

                    {pagination ? (
                        <nav
                            aria-label="Orders pagination"
                            className="mt-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                        >
                            <p className="text-sm text-slate-600">
                                Showing{" "}
                                <span className="font-semibold text-slate-900">
                                    {firstVisibleOrder}–
                                    {lastVisibleOrder}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-slate-900">
                                    {totalRecords}
                                </span>{" "}
                                orders
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <span className="text-center text-sm text-slate-500">
                                    Page{" "}
                                    <span className="font-semibold text-slate-800">
                                        {currentPage}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-slate-800">
                                        {totalPages}
                                    </span>
                                </span>

                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={
                                            handlePreviousPage
                                        }
                                        disabled={
                                            isFirstPage ||
                                            isFetching
                                        }
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <ChevronLeft
                                            size={17}
                                            aria-hidden="true"
                                        />
                                        Previous
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            handleNextPage
                                        }
                                        disabled={
                                            isLastPage ||
                                            isFetching
                                        }
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
                                    >
                                        Next
                                        <ChevronRight
                                            size={17}
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </nav>
                    ) : null}
                </>
            ) : null}
        </PageContainer>
    );
}