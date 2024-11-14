import { LoaderCircle } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <div className="loader">
        <LoaderCircle size={80} className="animate-spin" />
      </div>
    </div>
  );
}

export default loading;
