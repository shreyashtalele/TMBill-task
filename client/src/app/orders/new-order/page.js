import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header";
import CreateOrderForm from "@/components/orders/create-order-form";
import { ROUTES } from "@/constants/routes";

export const metadata = {
    title: "Create Order",
};

export default function CreateOrderPage() {
    return (
        <PageContainer>
            <PageHeader
                title="Create Order"
                description="Create a new order by selecting a store and adding one or more items."
                action={
                    <Link
                        href={ROUTES.ORDERS}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                        <ArrowLeft size={17} aria-hidden="true" />
                        Back to Orders
                    </Link>
                }
            />

            <CreateOrderForm />
        </PageContainer>
    );
}