import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  delay?: number;
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  required = true,
  delay = 0,
}: FormFieldProps) {
  const id = useId();
  const isFloating = value.length > 0;
  const isValid = isFloating && !error;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: delay * 0.1,
      }
    }
  };

  const inputVariants = {
    focused: { scale: 1.01, boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.15)" },
    unfocused: { scale: 1, boxShadow: "none" }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 25 }
    }
  };

  return (
    <motion.div
      className="relative space-y-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <motion.div
          variants={inputVariants}
          animate={isFocused ? "focused" : "unfocused"}
          className="relative"
        >
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=" "
            autoComplete={autoComplete}
            required={required}
            className={cn(
              "h-12 px-4 py-3 border-2 rounded-lg bg-transparent text-base transition-all focus:outline-none pr-10",
              isFloating ? "border-gray-400" : "border-gray-300",
              error ? "border-red-500 focus:border-red-500" : 
                    isValid ? "border-green-500 focus:border-green-500" : 
                    "focus:border-indigo-500",
              "placeholder-transparent"
            )}
          />
          <Label
            htmlFor={id}
            className={cn(
              "absolute px-1 ml-3 bg-white transition-all duration-200 pointer-events-none",
              isFloating
                ? "transform -translate-y-6 scale-90 text-sm font-medium"
                : "top-1/2 -translate-y-1/2 text-gray-500",
              isFocused ? "text-indigo-600" : "text-gray-700",
              error ? "text-red-500" : isValid ? "text-green-600" : ""
            )}
          >
            {label}
          </Label>

          {/* Status icons */}
          <AnimatePresence mode="wait">
            {isFloating && (
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key={error ? "error" : "success"}
              >
                {error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-sm mt-1 flex items-center"
          >
            <AlertCircle className="h-3 w-3 mr-1 inline-flex" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}