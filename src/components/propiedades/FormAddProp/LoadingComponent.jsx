import { Loader2 } from "lucide-react";
import React from "react";

const LoadingComponent = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <Loader2 className="w-12 h-12 text-white animate-spin-slow mb-2" />
      {message && <p className="text-white text-lg">{message}</p>}
    </div>
  );
};

export default LoadingComponent;
