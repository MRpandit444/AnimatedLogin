import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { SocialButton } from "@/components/auth/social-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { loginMutation } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Form state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormValues((prev) => ({ ...prev, rememberMe: checked }));
  };

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const validateField = (name: string, value: string) => {
    try {
      loginSchema.shape[name as keyof LoginFormValues].parse(value);
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
      if (key !== "rememberMe") {
        validateField(key, value as string);
        if (!value || (errors[key] && errors[key].length > 0)) {
          isValid = false;
        }
      }
    });

    if (!isValid) {
      // Trigger shake animation on form
      const form = document.getElementById("loginForm");
      form?.classList.add("animate-shake");
      setTimeout(() => {
        form?.classList.remove("animate-shake");
      }, 500);
      return;
    }

    // Submit form
    try {
      await loginMutation.mutateAsync({
        username: formValues.username,
        password: formValues.password,
      });
      
      // Show success state
      setIsSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your account</p>
      </motion.div>

      <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">
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
          autoComplete="current-password"
          delay={3}
        />

        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: 0.4,
          }}
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-me"
              checked={formValues.rememberMe}
              onCheckedChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-500"
            />
            <Label
              htmlFor="remember-me"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </motion.div>

        <SubmitButton
          isLoading={loginMutation.isPending}
          isSuccess={isSuccess}
          text="Sign in"
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
          Don't have an account?{" "}
          <a
            href="#register"
            className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors"
          >
            Sign up
          </a>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          delay: 0.7,
        }}
        className="mt-8"
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <SocialButton
            icon={
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            }
            name="Google"
            delay={8}
          />
          <SocialButton
            icon={
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            }
            name="Facebook"
            delay={8}
          />
          <SocialButton
            icon={
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.365 12.775c-.287-2.845 2.358-4.215 2.358-4.215-1.33-1.91-3.384-2.242-4.103-2.356-1.685-.15-3.369.98-4.25.98-.875 0-2.215-.97-3.634-.94-1.84.02-3.55 1.06-4.495 2.7-1.92 3.34.48 8.31 1.37 11.04.93 1.31 2.02 2.78 3.44 2.73 1.39-.05 1.91-.88 3.6-.88 1.67 0 2.14.88 3.61.85 1.49-.02 2.44-1.35 3.35-2.67.69-.96 1.22-2.3 1.47-3.55-2.42-1.05-2.13-3.04-2.13-3.04z"/>
                <path d="M14.51 7.645C15.231 6.84 15.741 5.734 15.6 4.6c-1.01.06-2.23.67-2.95 1.5-.65.77-1.22 1.88-1.08 3 1.14.09 2.26-.58 2.94-1.45z"/>
              </svg>
            }
            name="Apple"
            delay={8}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
