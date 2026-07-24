"use client";

import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { useUpdateOrderStatus } from "@/hooks/use-update-order-status";
import { getApiError } from "@/utils/get-api-error";

const ORDER_STATUSES = ["PLACED", "PREPARING", "COMPLETED"];

const STATUS_STYLES = {
  PLACED: "border-amber-300 bg-amber-50 text-amber-800",
  PREPARING: "border-blue-300 bg-blue-50 text-blue-800",
  COMPLETED: "border-emerald-300 bg-emerald-50 text-emerald-800",
};

export default function OrderStatusSelect({ orderId, currentStatus }) {
  const { mutate, isPending } = useUpdateOrderStatus();

  function handleStatusChange(event) {
    const newStatus = event.target.value;

    if (newStatus === currentStatus || isPending) {
      return;
    }

    const shouldUpdate = window.confirm(
      `Change order #${orderId} status from ${currentStatus} to ${newStatus}?`,
    );

    if (!shouldUpdate) {
      return;
    }

    mutate(
      {
        orderId,
        status: newStatus,
      },
      {
        onSuccess: (response) => {
          const updatedStatus = response?.data?.status ?? newStatus;

          toast.success(
            `Order #${orderId} status updated to ${updatedStatus}.`,
          );
        },

        onError: (error) => {
          toast.error(getApiError(error));
        },
      },
    );
  }

  const statusClassName =
    STATUS_STYLES[currentStatus] ?? "border-slate-300 bg-white text-slate-700";

  return (
    <div className="min-w-40">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        aria-label={`Update status for order ${orderId}`}
        aria-busy={isPending}
        className={`w-full rounded-lg border px-3 py-2 text-sm font-semibold outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60 ${statusClassName}`}
      >
        {ORDER_STATUSES.map((status) => (
          <option
            key={status}
            value={status}
            className="bg-white text-slate-900"
          >
            {status}
          </option>
        ))}
      </select>

      {isPending ? (
        <p
          className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"
          aria-live="polite"
        >
          <LoaderCircle size={13} className="animate-spin" aria-hidden="true" />
          Updating status...
        </p>
      ) : null}
    </div>
  );
}
