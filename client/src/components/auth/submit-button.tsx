import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isLoading: boolean;
  isSuccess?: boolean;
  text: string;
  successText?: string;
  className?: string;
  delay?: number;
}

export function SubmitButton({
  isLoading,
  isSuccess = false,
  text,
  successText = "Success!",
  className,
  delay = 0,
}: SubmitButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: delay * 0.1,
      }}
      className="w-full"
    >
      <Button
        type="submit"
        disabled={isLoading || isSuccess}
        className={cn(
          "w-full h-12 flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition-all",
          "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
          "shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
          "disabled:opacity-80 disabled:hover:translate-y-0 disabled:cursor-not-allowed",
          isSuccess ? "bg-green-500 hover:bg-green-500" : "",
          className
        )}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          <span className="flex items-center">
            <Check className="w-5 h-5 mr-2" /> {successText}
          </span>
        ) : (
          text
        )}
      </Button>
    </motion.div>
  );
}
