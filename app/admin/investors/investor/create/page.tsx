import { CreateInvestorForm } from "./create-investor-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function CreatePage() {
  return (
    <div>
      <Card className="px-10 my-3 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create Investor</CardTitle>
          <CardDescription>
            Fill in the form to create a new investor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateInvestorForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePage;
