import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome to the Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-indigo-600" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold">{user?.username}</p>
                  <p className="text-gray-500 text-sm">Logged in successfully</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600">
              You have successfully logged in to the application with animated login form.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={handleLogout}
              className="w-full"
              variant="outline"
              disabled={logoutMutation.isPending}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
