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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { UpdateInvestor } from "@/server/actions";
import { useRouter } from "next/navigation";
import { CapitalInvestors } from "@prisma/client";

const EditInvestorFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(17).optional(),
});

export type EditInvestorFormSchema = z.infer<typeof EditInvestorFormSchema>;

export function EditInvestorForm(investor: CapitalInvestors) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof EditInvestorFormSchema>>({
    resolver: zodResolver(EditInvestorFormSchema),
    defaultValues: {
      name: investor?.name,
      email: investor?.email ?? undefined,
      phone: investor?.phone ?? undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof EditInvestorFormSchema>) {
    setIsLoading(true);
    const res = await UpdateInvestor(investor.id, values);
    if (res?.error) {
      toast.error(`${res?.error}`);
      setIsLoading(false);
      return;
    }
    toast.success("Investor updated successfully");
    setIsLoading(false);
    router.push(`/admin/investors/investor/${investor.id}`);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your investors prefered refrence name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is could be the investor's valid name or a reference
                  name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="inverstor email address" {...field} />
                </FormControl>
                <FormDescription>
                  This is the Investors's email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="investor's phone number" {...field} />
                </FormControl>
                <FormDescription>
                  This is the Investors's phone number.
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
    </>
  );
}
