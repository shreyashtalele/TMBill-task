"use client";

import { Trash2 } from "lucide-react";

import { BUTTON_LABELS } from "@/constants/button-labels";

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100";

const errorInputClassName =
  "border-red-400 focus:border-red-500 focus:ring-red-500/10";

export default function OrderItemRow({
  index,
  register,
  errors,
  onRemove,
  canRemove,
  isDisabled = false,
}) {
  const itemErrors = errors.items?.[index];
  const itemNumber = index + 1;

  const itemIdErrorId = `item-id-error-${index}`;
  const quantityErrorId = `item-quantity-error-${index}`;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:border-slate-300 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            {itemNumber}
          </span>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Item {itemNumber}
            </h3>

            <p className="text-xs text-slate-500">
              Enter the item identifier and quantity.
            </p>
          </div>
        </div>

        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            disabled={isDisabled}
            aria-label={`Remove item ${itemNumber}`}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} aria-hidden="true" />
            <span className="hidden sm:inline">
              {BUTTON_LABELS.REMOVE_ITEM}
            </span>
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`item-id-${index}`}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Item ID
          </label>

          <input
            id={`item-id-${index}`}
            type="number"
            min="1"
            placeholder="Enter item ID"
            disabled={isDisabled}
            aria-invalid={Boolean(itemErrors?.item_id)}
            aria-describedby={itemErrors?.item_id ? itemIdErrorId : undefined}
            {...register(`items.${index}.item_id`, {
              valueAsNumber: true,
            })}
            className={`${inputClassName} ${
              itemErrors?.item_id ? errorInputClassName : ""
            }`}
          />

          {itemErrors?.item_id ? (
            <p
              id={itemIdErrorId}
              role="alert"
              className="mt-1.5 text-sm text-red-600"
            >
              {itemErrors.item_id.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">
              Use the numeric ID of the item.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`item-quantity-${index}`}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Quantity
          </label>

          <input
            id={`item-quantity-${index}`}
            type="number"
            min="1"
            placeholder="Enter quantity"
            disabled={isDisabled}
            aria-invalid={Boolean(itemErrors?.qty)}
            aria-describedby={itemErrors?.qty ? quantityErrorId : undefined}
            {...register(`items.${index}.qty`, {
              valueAsNumber: true,
            })}
            className={`${inputClassName} ${
              itemErrors?.qty ? errorInputClassName : ""
            }`}
          />

          {itemErrors?.qty ? (
            <p
              id={quantityErrorId}
              role="alert"
              className="mt-1.5 text-sm text-red-600"
            >
              {itemErrors.qty.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">
              Quantity must be at least 1.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
