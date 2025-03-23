import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Handle hash change for form switching
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "register") {
        setActiveTab("register");
      } else {
        setActiveTab("login");
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen w-full flex md:items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 font-sans p-4 md:p-0">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-5 backdrop-blur-sm z-0"></div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 z-10">
        {/* Form column */}
        <div className="w-full max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                window.location.hash = value;
              }}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <TabsContent value="login" className="mt-0">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                  <RegisterForm />
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>

        {/* Hero column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex flex-col justify-center"
        >
          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Experience our animated login
            </h1>
            <p className="text-xl text-gray-700">
              Seamlessly sign in with our modern, responsive interface featuring smooth animations and intuitive validation.
            </p>
            <ul className="space-y-3">
              {[
                "Animated form fields with floating labels",
                "Smart form validation with visual feedback",
                "Secure authentication system",
                "Responsive design for all devices"
              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
