import { Activity } from "lucide-react";

const MedLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        <div className="relative flex items-center justify-center p-3 text-white rounded-full shadow-lg bg-primary shadow-primary/50 animate-pulse">
          <Activity className="w-8 h-8" />
        </div>
      </div>
      <p className="text-sm font-medium tracking-widest uppercase text-primary animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default MedLoader;
