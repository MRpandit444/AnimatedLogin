import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  // Custom hover animations for different providers
  const getHoverStyles = () => {
    switch (name.toLowerCase()) {
      case 'google':
        return isHovered ? { 
          boxShadow: "0 0 0 2px rgba(234, 67, 53, 0.4)",
          backgroundColor: "rgba(234, 67, 53, 0.05)"
        } : {};
      case 'facebook':
        return isHovered ? { 
          boxShadow: "0 0 0 2px rgba(66, 103, 178, 0.4)",
          backgroundColor: "rgba(66, 103, 178, 0.05)"
        } : {};
      case 'apple':
        return isHovered ? {
          boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.4)",
          backgroundColor: "rgba(0, 0, 0, 0.05)"
        } : {};
      default:
        return isHovered ? { 
          boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.4)",
          backgroundColor: "rgba(99, 102, 241, 0.05)"
        } : {};
    }
  };
  
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
      className="relative group"
    >
      <motion.div
        className="absolute -inset-0.5 rounded-md opacity-0 group-hover:opacity-100 blur"
        animate={{
          background: isHovered 
            ? "linear-gradient(to right, #6366f1, #8b5cf6)" 
            : "none",
          opacity: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={getHoverStyles()}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onClick}
          className={cn(
            "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 transition-all relative z-10",
            className
          )}
          aria-label={`Sign in with ${name}`}
        >
          <motion.div
            animate={{ rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}
