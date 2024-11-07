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
import { ModifyCredit } from "@/server/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditSales } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreditFormSchema = z.object({
  amountPaidSoFar: z.coerce.number().optional(),
  paymentNotes: z.string().optional(),
});

export type CreditFormSchema = z.infer<typeof CreditFormSchema>;

export default function ModifyCreditForm({
  id,
  credit,
  actualSellingPrice,
}: {
  id: number;
  credit?: CreditSales;
  actualSellingPrice: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof CreditFormSchema>>({
    resolver: zodResolver(CreditFormSchema),
    defaultValues: {
      amountPaidSoFar: Number(credit?.amountPaidSoFar) || 0,
      paymentNotes: credit?.paymentNotes || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreditFormSchema>) {
    setIsLoading(true);
    const res = await ModifyCredit(id, values, actualSellingPrice);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success("Credit modified successfully");
    setOpen(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            {credit?.id ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span className="sr-only">Edit vehicle overview</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-fit my-3 overflow-y-auto max-h-dvh">
          <DialogHeader>
            <DialogTitle>Modify Dates</DialogTitle>
            <DialogDescription>
              Make changes to the vehicle dates, and save.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center"
            >
              <div className="grid gap-3 grid-cols-1 ">
                <FormField
                  control={form.control}
                  name="amountPaidSoFar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Paid</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the amount paid so far for the vehicle by the
                        client.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="paymentNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write down your anything important here"
                        className="h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Notable remarks for this vehicle credit payment
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
        </DialogContent>
      </Dialog>
    </>
  );
}
