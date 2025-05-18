import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="relative inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading CV...</span>
    </div>
  );
}
