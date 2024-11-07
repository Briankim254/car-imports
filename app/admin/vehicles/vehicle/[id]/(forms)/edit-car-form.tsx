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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import React, { useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { UpdateCar } from "@/server/actions";
import { Car } from "@prisma/client";

const CarFormSchema = z.object({
  brand: z.string().min(2).max(50),
  chasisNumber: z.string(),
  registration: z.string().optional(),
});

export type CarFormSchema = z.infer<typeof CarFormSchema>;

export default function EditVehicleForm(car: Car) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof CarFormSchema>>({
    resolver: zodResolver(CarFormSchema),
    defaultValues: {
      brand: car.brand || "",
      chasisNumber: car.chasisNumber || "",
      registration: car.registration || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CarFormSchema>) {
    setIsLoading(true);
    const res = await UpdateCar(car.id, values);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success("Car updated successfully");
    setOpen(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit vehicle overview</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Car's brand" {...field} />
                    </FormControl>
                    <FormDescription>This is required.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="car's registration number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the car's registration number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chasisNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chasis Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Cars's chasis number" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the car's chasis number.
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
