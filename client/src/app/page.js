import Link from "next/link";

import PageContainer from "@/components/layout/page-container";
import { APP_CONTENT } from "@/constants/app-content";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <PageContainer>
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-slate-500">
            {APP_CONTENT.APP_DESCRIPTION}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Manage orders across stores in real time
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Create orders, track their status, and review store
            analytics from one clean dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ROUTES.CREATE_ORDER}
              className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Create Order
            </Link>

            <Link
              href={ROUTES.ORDERS}
              className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              View Orders
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}