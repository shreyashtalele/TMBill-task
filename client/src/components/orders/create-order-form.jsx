"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IndianRupee, LoaderCircle, PackagePlus, Store } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import OrderItemsList from "@/components/orders/order-items-list";
import OrderSummary from "@/components/orders/order-summary";
import { BUTTON_LABELS } from "@/constants/button-labels";
import { DEFAULT_ORDER_FORM_VALUES } from "@/constants/default-values";
import { useCreateOrder } from "@/hooks/use-create-order";
import { orderSchema } from "@/schemas/order-schema";
import { getApiError } from "@/utils/get-api-error";

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100";

const errorInputClassName =
  "border-red-400 focus:border-red-500 focus:ring-red-500/10";

const sectionClassName =
  "rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
        <Icon size={20} strokeWidth={2} />
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>

        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default function CreateOrderForm() {
  const createOrderMutation = useCreateOrder();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: DEFAULT_ORDER_FORM_VALUES,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems =
    useWatch({
      control,
      name: "items",
    }) || [];

  const watchedTotalAmount =
    useWatch({
      control,
      name: "total_amount",
    }) || 0;

  const totalQuantity = watchedItems.reduce((total, item) => {
    const quantity = Number(item?.qty);

    return total + (Number.isFinite(quantity) ? quantity : 0);
  }, 0);

  const totalAmount = Number(watchedTotalAmount) || 0;

  const onSubmit = async (formData) => {
    createOrderMutation.reset();

    try {
      const response = await createOrderMutation.mutateAsync(formData);

      toast.success(response?.message ?? "Order created successfully.");

      reset(DEFAULT_ORDER_FORM_VALUES);
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  const onInvalid = () => {
    toast.error("Please fix the validation errors in the form.");
  };

  const isSubmitting = createOrderMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
    >
      <div className="space-y-6">
        <section className={sectionClassName}>
          <SectionHeader
            icon={Store}
            title="Store Information"
            description="Select the store for which this order is being created."
          />

          <div className="max-w-md">
            <label
              htmlFor="store_id"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Store ID
            </label>

            <input
              id="store_id"
              type="number"
              min="1"
              placeholder="Enter store ID"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.store_id)}
              aria-describedby={errors.store_id ? "store-id-error" : undefined}
              {...register("store_id", {
                valueAsNumber: true,
              })}
              className={`${inputClassName} ${
                errors.store_id ? errorInputClassName : ""
              }`}
            />

            {errors.store_id ? (
              <p
                id="store-id-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600"
              >
                {errors.store_id.message}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-slate-500">
                Enter a valid numeric store identifier.
              </p>
            )}
          </div>
        </section>

        <section className={sectionClassName}>
          <SectionHeader
            icon={PackagePlus}
            title="Order Items"
            description="Add one or more items and specify the required quantity."
          />

          <OrderItemsList
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
            isDisabled={isSubmitting}
          />

          {errors.items?.root ? (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {errors.items.root.message}
            </p>
          ) : null}
        </section>

        <section className={sectionClassName}>
          <SectionHeader
            icon={IndianRupee}
            title="Order Amount"
            description="Enter the final amount payable for this order."
          />

          <div className="max-w-md">
            <label
              htmlFor="total_amount"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Total Amount
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-medium text-slate-500">
                ₹
              </span>

              <input
                id="total_amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.total_amount)}
                aria-describedby={
                  errors.total_amount ? "total-amount-error" : undefined
                }
                {...register("total_amount", {
                  valueAsNumber: true,
                })}
                className={`${inputClassName} pl-8 ${
                  errors.total_amount ? errorInputClassName : ""
                }`}
              />
            </div>

            {errors.total_amount ? (
              <p
                id="total-amount-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600"
              >
                {errors.total_amount.message}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-slate-500">
                Enter the complete order amount in INR.
              </p>
            )}
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <OrderSummary
          itemCount={fields.length}
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />
              <span>{BUTTON_LABELS.CREATING_ORDER}</span>
            </>
          ) : (
            <>
              <PackagePlus size={18} aria-hidden="true" />
              <span>{BUTTON_LABELS.CREATE_ORDER}</span>
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-slate-500">
          Review the order details before submitting.
        </p>
      </aside>
    </form>
  );
}
