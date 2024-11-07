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
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Pencil,
  PlusCircle,
} from "lucide-react";
import { ModifyInvestments } from "@/server/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CarInvestments } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const investmentsFormSchema = z.object({
  initialAmount: z.coerce.number().multipleOf(0.01),
  investorId: z.coerce.number().min(1),
  remarks: z.string().optional(),
});

export type investmentsFormSchema = z.infer<typeof investmentsFormSchema>;

export default function ModifyInvestmentsForm({
  carId,
  investors,
  capitalInvestment,
}: {
  carId: number;
  investors: { id: number; name: string }[];
  capitalInvestment?: CarInvestments;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof investmentsFormSchema>>({
    resolver: zodResolver(investmentsFormSchema),
    defaultValues: {
      initialAmount: Number(capitalInvestment?.initialAmount) || 0,
      investorId: capitalInvestment?.investorId || 0,
      remarks: capitalInvestment?.remarks || "",
    },
  });

  async function onSubmit(values: z.infer<typeof investmentsFormSchema>) {
    setIsLoading(true);

    const res = await ModifyInvestments(carId, values);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success("Sales modified successfully");
    form.reset();
    setOpen(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            {capitalInvestment?.id ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span className="sr-only">Edit Vehicle Investor</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-fit my-3 overflow-y-auto max-h-dvh">
          <DialogHeader>
            <DialogTitle>Modify Investments</DialogTitle>
            <DialogDescription>
              Make changes to the vehicle investments, and save.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center p-3"
            >
              <div className="grid  gap-3 grid-cols-1 ">
                <FormField
                  control={form.control}
                  name="investorId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? investors.find(
                                    (investor: { id: number; name: string }) =>
                                      investor.id === field.value
                                  )?.name
                                : "Select Investor"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput placeholder="Search for a investor..." />
                            <CommandList>
                              <CommandEmpty>No categorys found.</CommandEmpty>
                              <CommandGroup>
                                {investors.map(
                                  (investor: { id: number; name: string }) => (
                                    <CommandItem
                                      value={investor.name}
                                      key={investor.id}
                                      onSelect={() => {
                                        form.setValue(
                                          "investorId",
                                          investor.id
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          investor.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {investor.name}
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is the category of this product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initialAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          // min={0.01}
                          placeholder="KSH"
                          {...field}
                        />
                      </FormControl>
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
