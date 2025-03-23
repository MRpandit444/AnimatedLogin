import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export function SocialButton({
  icon,
  name,
  onClick,
  className,
  delay = 0,
}: SocialButtonProps) {
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
    >
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        className={cn(
          "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors",
          className
        )}
        aria-label={`Sign in with ${name}`}
      >
        {icon}
      </Button>
    </motion.div>
  );
}
