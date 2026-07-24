import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export default function OrdersEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-gray-900">No orders found</h2>

      <p className="mt-2 text-sm text-gray-600">
        Create your first order to see it here.
      </p>

      <Link
        href={ROUTES.NEW_ORDER}
        className="mt-6 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Create Order
      </Link>
    </div>
  );
}
