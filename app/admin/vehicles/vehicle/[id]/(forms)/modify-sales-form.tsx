/* eslint-disable react/no-unescaped-entities */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import React, { useState } from "react";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { ModifySales } from "@/server/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sales } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/extension/responsive-modal";

const SalesFormSchema = z.object({
  targetMarkup: z.coerce.number().multipleOf(0.01),
  actualSellingPrice: z.coerce.number().min(0.01).optional(),
  remarks: z.string().optional(),
});

export type SalesFormSchema = z.infer<typeof SalesFormSchema>;

export default function ModifySalesForm({
  id,
  sales,
  totalCost,
}: {
  id: number;
  sales?: Sales;
  totalCost: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof SalesFormSchema>>({
    resolver: zodResolver(SalesFormSchema),
    defaultValues: {
      targetMarkup: Number(sales?.targetMarkup) || 0,
      actualSellingPrice: sales?.actualSellingPrice,
      remarks: sales?.remarks || "",
    },
  });

  async function onSubmit(values: z.infer<typeof SalesFormSchema>) {
    setIsLoading(true);
    const targetSellingPrice = Number(
      totalCost * (1 + values.targetMarkup / 100)
    );
    const res = await ModifySales(id, values, targetSellingPrice);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success("Sales modified successfully");
    setOpen(false);
  }
  return (
    <>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalTrigger asChild>
          <Button variant="ghost" size="icon">
            {sales?.id ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span className="sr-only">Edit vehicle sales</span>
          </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="sm:min-w-fit my-3 overflow-y-auto max-h-dvh">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Modify Sales</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Make changes to the vehicle sales, and save.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center"
            >
              <div className="grid  gap-3 grid-cols-1 ">
                <FormField
                  control={form.control}
                  name="targetMarkup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Mark up</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="%"
                          {...field}
                          // onChange={(e) => {
                          // const value = parseFloat(e.target.value).toFixed(2);
                          // field.onChange(value);
                          // }}
                        />
                      </FormControl>
                      <FormDescription>
                        The percentage markup on total vehicle cost.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="actualSellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Actual Selling Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          // min={0.01}
                          placeholder="KSH"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The actual selling price of the vehicle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write down your anything important here"
                        className="h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Notable remarks for this vehicle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
