import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { EditInvestorForm } from "@/app/admin/investors/investor/[id]/edit-investor-form";
import { Badge } from "@/components/ui/badge";
import prisma from "@/prisma/prisma";

async function getData(id: string) {
  const data = await prisma.capitalInvestors.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return data;
}

export default async function investorPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const investor = data;
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
      <div className="flex-1 bg-muted rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={investor?.name || "/placeholder-user.jpg"} />
            <AvatarFallback>
              {investor?.name
                ?.split(" ")
                .map((name: string) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="text-xl font-bold">{investor?.name}</div>
            <div className="text-muted-foreground">{investor?.email}</div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4">
          <div className="flex gap-2">
            <h3 className="text-md font-semibold">Phone:</h3>
            <Badge variant="default">{investor?.phone}</Badge>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold">Created </h3>
            <p className="text-muted-foreground">
              {investor?.createdAt &&
                new Date(investor?.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md bg-muted rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Investor Info</h2>
        {investor && <EditInvestorForm {...investor} />}
      </div>
    </div>
  );
}
