"use client";

import {
    BarChart3,
    CircleDollarSign,
    PackageCheck,
    Store,
    Trophy,
} from "lucide-react";

import AnalyticsCard from "@/components/analytics/analytics-card";
import AnalyticsSkeleton from "@/components/analytics/analytics-skeleton";
import OrdersPerDayTable from "@/components/analytics/orders-per-day-table";
import RevenuePerStoreTable from "@/components/analytics/revenue-per-store-table";
import TopSellingItemsTable from "@/components/analytics/top-selling-items-table";
import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header";
import { APP_CONFIG } from "@/constants/app-config";
import { useAnalytics } from "@/hooks/use-analytics";
import { useOrderSocket } from "@/hooks/use-order-socket";
import { formatCurrency } from "@/utils/format-currency";
import { getApiError } from "@/utils/get-api-error";

export default function AnalyticsPage() {
    useOrderSocket(APP_CONFIG.DEFAULT_STORE_ID);

    const {
        ordersPerDay,
        revenuePerStore,
        topSellingItems,
        isLoading,
        isError,
        isFetching,
        error,
        refetchAll,
    } = useAnalytics();

    if (isLoading) {
        return (
            <PageContainer>
                <PageHeader
                    title="Analytics Dashboard"
                    description="Monitor order activity, revenue, store performance and top-selling items."
                />

                <AnalyticsSkeleton />
            </PageContainer>
        );
    }

    if (isError) {
        return (
            <PageContainer>
                <PageHeader
                    title="Analytics Dashboard"
                    description="Monitor order activity, revenue, store performance and top-selling items."
                />

                <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 shadow-sm">
                    <p className="font-semibold text-red-800">
                        Unable to load analytics
                    </p>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                        {getApiError(error)}
                    </p>

                    <button
                        type="button"
                        onClick={refetchAll}
                        disabled={isFetching}
                        className="mt-4 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isFetching ? "Retrying..." : "Retry"}
                    </button>
                </div>
            </PageContainer>
        );
    }

    const ordersData = ordersPerDay.data?.data ?? [];
    const revenueData = revenuePerStore.data?.data ?? [];
    const topItemsData = topSellingItems.data?.data ?? [];

    const totalOrders = ordersData.reduce(
        (sum, order) => sum + Number(order.total_orders || 0),
        0,
    );

    const totalRevenue = revenueData.reduce(
        (sum, storeData) => sum + Number(storeData.total_revenue || 0),
        0,
    );

    const totalStores = revenueData.length;

    const topItem =
        topItemsData.length > 0
            ? `ITEM-${String(topItemsData[0].item_id).padStart(4, "0")}`
            : "No data";

    return (
        <PageContainer>
            <PageHeader
                title="Analytics Dashboard"
                description="Monitor order activity, revenue, store performance and top-selling items."
            />

            <section
                aria-labelledby="analytics-overview-heading"
                className="space-y-5"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <BarChart3 size={20} aria-hidden="true" />
                    </div>

                    <div>
                        <h2
                            id="analytics-overview-heading"
                            className="text-lg font-semibold text-slate-900"
                        >
                            Performance Overview
                        </h2>

                        <p className="mt-0.5 text-sm text-slate-500">
                            A quick summary of the latest business data.
                        </p>
                    </div>
                </div>

                <div
                    className={
                        isFetching
                            ? "grid gap-5 opacity-70 transition md:grid-cols-2 xl:grid-cols-4"
                            : "grid gap-5 transition md:grid-cols-2 xl:grid-cols-4"
                    }
                >
                    <AnalyticsCard
                        title="Total Orders"
                        value={totalOrders}
                        description="Orders recorded across all days"
                        icon={PackageCheck}
                        iconClassName="bg-blue-100 text-blue-700"
                    />

                    <AnalyticsCard
                        title="Total Revenue"
                        value={formatCurrency(totalRevenue)}
                        description="Revenue generated by all stores"
                        icon={CircleDollarSign}
                        iconClassName="bg-emerald-100 text-emerald-700"
                    />

                    <AnalyticsCard
                        title="Active Stores"
                        value={totalStores}
                        description="Stores included in analytics"
                        icon={Store}
                        iconClassName="bg-violet-100 text-violet-700"
                    />

                    <AnalyticsCard
                        title="Top Selling Item"
                        value={topItem}
                        description="Highest-selling item by quantity"
                        icon={Trophy}
                        iconClassName="bg-amber-100 text-amber-700"
                    />
                </div>
            </section>

            <section
                aria-labelledby="analytics-details-heading"
                className="mt-10 space-y-6"
            >
                <div>
                    <h2
                        id="analytics-details-heading"
                        className="text-lg font-semibold text-slate-900"
                    >
                        Detailed Analytics
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Review daily orders, store revenue and item sales performance.
                    </p>
                </div>

                <div
                    className={
                        isFetching
                            ? "space-y-8 opacity-70 transition"
                            : "space-y-8 transition"
                    }
                >
                    <OrdersPerDayTable data={ordersData} />

                    <div className="grid items-start gap-8 xl:grid-cols-2">
                        <RevenuePerStoreTable data={revenueData} />

                        <TopSellingItemsTable data={topItemsData} />
                    </div>
                </div>
            </section>
        </PageContainer>
    );
}