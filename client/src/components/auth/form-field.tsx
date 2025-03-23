import { useId } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

  return (
    <motion.div
      className="relative space-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: delay * 0.1,
      }}
    >
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          autoComplete={autoComplete}
          required={required}
          className={cn(
            "h-12 px-4 py-3 border-2 rounded-lg bg-transparent text-base transition-all focus:outline-none",
            isFloating ? "border-gray-400" : "border-gray-300",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "focus:border-indigo-500 focus:ring-indigo-500/20",
            "placeholder-transparent"
          )}
        />
        <Label
          htmlFor={id}
          className={cn(
            "absolute px-1 ml-3 bg-white transition-all duration-200 pointer-events-none",
            isFloating
              ? "transform -translate-y-6 scale-90 text-sm text-gray-700"
              : "top-1/2 -translate-y-1/2 text-gray-500"
          )}
        >
          {label}
        </Label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
