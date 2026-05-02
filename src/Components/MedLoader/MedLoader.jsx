import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const MedLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <motion.div 
        className="relative flex items-center justify-center w-20 h-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="relative flex items-center justify-center p-4 text-white rounded-full shadow-lg bg-primary shadow-primary/40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Activity className="w-8 h-8" />
        </motion.div>
      </motion.div>
      <motion.p 
        className="text-sm font-heading font-bold tracking-[0.2em] uppercase text-primary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading
      </motion.p>
    </div>
  );
};

export default MedLoader;
