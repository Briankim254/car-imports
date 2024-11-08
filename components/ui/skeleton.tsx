import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    >
      <div className="flex content-center h-full justify-center">
        <Loader className="animate-spin" />
      </div>
    </div>
  );
}

export { Skeleton };
