import { LoaderCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <div className="loader">
        <LoaderCircle size={80} className="animate-spin" />
      </div>
    </div>
  );
}
