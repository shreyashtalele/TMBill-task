"use client";

import { Plus } from "lucide-react";

import OrderItemRow from "@/components/orders/order-item-row";
import { BUTTON_LABELS } from "@/constants/button-labels";
import { DEFAULT_ORDER_ITEM } from "@/constants/default-values";

export default function OrderItemsList({
  fields,
  append,
  remove,
  register,
  errors,
  isDisabled = false,
}) {
  const handleAddItem = () => {
    if (isDisabled) {
      return;
    }

    append({ ...DEFAULT_ORDER_ITEM });
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-700">Added items</p>

          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
            {fields.length}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          disabled={isDisabled}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <Plus size={17} aria-hidden="true" />
          <span>{BUTTON_LABELS.ADD_ITEM}</span>
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <OrderItemRow
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            canRemove={fields.length > 1 && !isDisabled}
            onRemove={() => remove(index)}
            isDisabled={isDisabled}
          />
        ))}
      </div>

      {fields.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">No items added</p>

          <p className="mt-1 text-xs text-slate-500">
            Add at least one item to create the order.
          </p>
        </div>
      ) : null}
    </div>
  );
}
