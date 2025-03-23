import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  
  // Create animated particles for success effect
  const SuccessParticles = () => {
    return (
      <AnimatePresence>
        {isSuccess && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                animate={{ 
                  scale: [0, 1],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                  opacity: [1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.1 + (i * 0.04)
                }}
                className="absolute w-2 h-2 rounded-full bg-green-400"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    );
  };

  // Define button background gradient animation
  const gradientAnimation = isHovered && !isLoading && !isSuccess ? {
    backgroundPosition: ["0% 0%", "100% 0%"],
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const }
  } : {};
  
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
      className="w-full relative"
    >
      <motion.div
        whileHover={!isLoading && !isSuccess ? { scale: 1.02 } : {}}
        whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="w-full relative"
      >
        <SuccessParticles />
        
        <motion.div 
          className="absolute -inset-0.5 rounded-lg blur-sm opacity-70"
          initial={{ 
            background: "linear-gradient(45deg, rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.4))"
          }}
          animate={isHovered && !isLoading && !isSuccess ? { 
            background: [
              "linear-gradient(45deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))",
              "linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(99, 102, 241, 0.8))"
            ],
            boxShadow: "0 0 20px 2px rgba(99, 102, 241, 0.3)"
          } : {}}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div
          initial={{ 
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 0%"
          }}
          animate={{
            ...gradientAnimation,
            background: isSuccess 
              ? "linear-gradient(to right, #34d399, #10b981)" 
              : "linear-gradient(to right, #6366f1, #8b5cf6, #6366f1)"
          }}
          className="relative"
        >
          <Button
            type="submit"
            disabled={isLoading || isSuccess}
            className={cn(
              "w-full h-12 flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition-all",
              "shadow-md relative z-10",
              "disabled:opacity-80 disabled:cursor-not-allowed",
              isSuccess ? "bg-transparent" : "bg-transparent",
              className
            )}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoadingSpinner />
                </motion.div>
              ) : isSuccess ? (
                <motion.span 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [0.8, 1.2, 1],
                    y: [0, -5, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.4,
                    times: [0, 0.6, 1]
                  }}
                  className="flex items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                    className="mr-2"
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                  {successText}
                </motion.span>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  {text}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
