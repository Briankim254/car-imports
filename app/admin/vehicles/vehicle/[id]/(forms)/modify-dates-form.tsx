/* eslint-disable react/no-unescaped-entities */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import React, { useState } from "react";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { ModifyDates } from "@/server/actions";
import { Dates } from "@prisma/client";
import { SmartDatetimeInput } from "@/components/ui/extension/smart-datetime-input";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/extension/responsive-modal";

const DatesFormSchema = z.object({
  orderDate: z.date().nullable().optional(),
  finalPaymentDate: z.date().nullable(),
  deliveryAtPortDate: z.date().nullable(),
  exitFromPortDate: z.date().nullable(),
  customerAcquisitionDate: z.date().nullable(),
  finalClientPaymentDate: z.date().nullable(),
});

export type DatesFormSchema = z.infer<typeof DatesFormSchema>;

export default function ModifyDatesForm({
  id,
  dates,
}: {
  id: number;
  dates?: Dates;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof DatesFormSchema>>({
    resolver: zodResolver(DatesFormSchema),
    defaultValues: {
      orderDate: dates?.orderDate,
      finalPaymentDate: dates?.finalPaymentDate,
      deliveryAtPortDate: dates?.deliveryAtPortDate,
      exitFromPortDate: dates?.exitFromPortDate,
      customerAcquisitionDate: dates?.customerAcquisitionDate,
      finalClientPaymentDate: dates?.finalClientPaymentDate,
    },
  });

  async function onSubmit(values: z.infer<typeof DatesFormSchema>) {
    setIsLoading(true);
    const res = await ModifyDates(id, values);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success("Dates modified successfully");
    setOpen(false);
  }
  return (
    <>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalTrigger asChild>
          <Button variant="ghost" size="icon">
            {dates?.id ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span className="sr-only">Edit vehicle overview</span>
          </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Modify Dates</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Make changes to the vehicle dates, and save.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center"
            >
              <div className="grid md:grid-cols-2 gap-6 grid-cols-1 ">
                <FormField
                  control={form.control}
                  name="orderDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Order Date</FormLabel>
                      <SmartDatetimeInput
                        name="orderDate"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onValueChange={(date) => field.onChange(date)}
                        placeholder="e.g. tomorrow at 3pm"
                      />
                      <FormDescription>
                        The date the vehicle was ordered
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="finalPaymentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Final Payment Date</FormLabel>
                      <SmartDatetimeInput
                        name="finalPaymentDate"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onValueChange={(date) => field.onChange(date)}
                        placeholder="e.g. tomorrow at 3pm"
                      />
                      <FormDescription>
                        The date the final payment was made
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAtPortDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Delivery At Port Date</FormLabel>
                      <SmartDatetimeInput
                        name="deliveryAtPortDate"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onValueChange={(date) => field.onChange(date)}
                        placeholder="e.g. tomorrow at 3pm"
                      />
                      <FormDescription>
                        The date the vehicle was delivered at the port
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="exitFromPortDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Exit From Port Date</FormLabel>
                      <SmartDatetimeInput
                        name="exitFromPortDate"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onValueChange={(date) => field.onChange(date)}
                        placeholder="e.g. tomorrow at 3pm"
                      />
                      <FormDescription>
                        The date the vehicle exited the port
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerAcquisitionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Customer Acquisition Date</FormLabel>
                      <SmartDatetimeInput
                        name="customerAcquisitionDate"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onValueChange={(date) => field.onChange(date)}
                        placeholder="e.g. 3 days from now"
                      />
                      <FormDescription>
                        The date the vehicle was acquired by the customer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="finalClientPaymentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Final Client Payment Date</FormLabel>
                      <SmartDatetimeInput
                        name="finalClientPaymentDate"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onValueChange={(date) => field.onChange(date)}
                        placeholder="e.g. tomorrow at 3pm"
                      />
                      <FormDescription>
                        The date the final payment was made by the customer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
