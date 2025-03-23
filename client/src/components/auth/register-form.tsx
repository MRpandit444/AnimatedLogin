import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { FormField } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must include uppercase, lowercase, and a number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { registerMutation } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Form state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const validateField = (name: string, value: string) => {
    try {
      if (name === "confirmPassword") {
        if (value !== formValues.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
          return;
        }
      }
      
      registerSchema.shape[name as keyof RegisterFormValues].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    Object.entries(formValues).forEach(([key, value]) => {
      validateField(key, value as string);
      if (!value || (errors[key] && errors[key].length > 0)) {
        isValid = false;
      }
    });

    // Additional validation for confirm password
    if (formValues.password !== formValues.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (!isValid) {
      // Trigger shake animation on form
      const form = document.getElementById("registerForm");
      form?.classList.add("animate-shake");
      setTimeout(() => {
        form?.classList.remove("animate-shake");
      }, 500);
      return;
    }

    // Submit form
    try {
      await registerMutation.mutateAsync({
        username: formValues.username,
        password: formValues.password,
      });
      
      // Show success state
      setIsSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormValues({
          username: "",
          password: "",
          confirmPassword: "",
        });
      }, 1500);
    } catch (error) {
      // Error is already handled by react-query
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-500">Sign up to get started</p>
      </motion.div>

      <form id="registerForm" onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Username"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          onBlur={(e) => validateField("username", e.target.value)}
          error={errors.username}
          autoComplete="username"
          delay={2}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          onBlur={(e) => validateField("password", e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          delay={3}
        />

        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          onBlur={(e) => validateField("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
          delay={4}
        />

        <SubmitButton
          isLoading={registerMutation.isPending}
          isSuccess={isSuccess}
          text="Create Account"
          delay={5}
        />
      </form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          delay: 0.6,
        }}
        className="mt-8 text-center"
      >
        <p className="text-gray-600">
          Already have an account?{" "}
          <a
            href="#login"
            className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
