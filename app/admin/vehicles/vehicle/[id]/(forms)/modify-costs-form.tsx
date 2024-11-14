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
import { ModifyCosts } from "@/server/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Costs } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/extension/responsive-modal";

const CostsFormSchema = z.object({
  landingCost: z.coerce.number().optional(),
  duty: z.coerce.number().optional(),
  portCharges: z.coerce.number().optional(),
  clearingCost: z.coerce.number().optional(),
  fuelAndDriver: z.coerce.number().optional(),
  insurance: z.coerce.number().optional(),
  serviceCost: z.coerce.number().optional(),
  otherCost: z.coerce.number().optional(),
  remarks: z.string().optional(),
});

export type CostsFormSchema = z.infer<typeof CostsFormSchema>;

export default function ModifyCostForm({
  id,
  costs,
}: {
  id: number;
  costs?: Costs;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof CostsFormSchema>>({
    resolver: zodResolver(CostsFormSchema),
    defaultValues: {
      landingCost: costs?.landingCost || 0,
      duty: costs?.duty || 0,
      portCharges: costs?.portCharges || 0,
      clearingCost: costs?.clearingCost || 0,
      fuelAndDriver: costs?.fuelAndDriver || 0,
      insurance: costs?.insurance || 0,
      serviceCost: costs?.serviceCost || 0,
      otherCost: costs?.otherCost || 0,
      remarks: costs?.remarks || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CostsFormSchema>) {
    setIsLoading(true);
    const totalCost = Object.entries(values).reduce((acc, [key, value]) => {
      if (key !== "remarks") {
        return acc + (value as number);
      }
      return acc;
    }, 0);
    const res = await ModifyCosts(id, values, totalCost);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setOpen(false);
    toast.success("Costs modified successfully");
  }
  return (
    <>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalTrigger asChild>
          <Button variant="ghost" size="icon">
            {costs?.id ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span className="sr-only">Edit vehicle overview</span>
          </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="sm:min-w-fit my-3 overflow-y-auto max-h-dvh">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Modify Costs</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Make changes to the vehicle costs, and save.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center"
            >
              <div className="grid md:grid-cols-3 gap-3 grid-cols-1 ">
                <FormField
                  control={form.control}
                  name="landingCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landing Cost</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of landing the vehicle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duty</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of the vehicle's duty.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portCharges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Port Charges</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of the vehicle's port charges.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clearingCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clearing Cost</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of clearing the vehicle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fuelAndDriver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel & Driver</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of fuel and the driver.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="insurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of the vehicle's insurance.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Cost</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of servicing the vehicle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="otherCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Cost</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="in KSH" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the cost of other expenses.
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
