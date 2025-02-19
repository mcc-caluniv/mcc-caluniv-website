import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import BG from "@/assets/img/asset-1.png";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isSigningIn, forgotPassword, isForgotPassLoading } =
    useAuthStore();
  const [formType, setFormType] = useState("login"); // "login" or "forgotPassword"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === "login") {
      login(formData);
      setFormData({ email: "", password: "" });
    } else {
      await forgotPassword(formData.email);
      if (!isForgotPassLoading) {
        setFormData({ email: "", password: "" });
        setFormType("login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#1B2A4A] bg-cover bg-center bg-no-repeat px-4 py-20 relative min-h-[80vh]">
      <div
        className={`absolute inset-0 bg-cover bg-center opacity-20`}
        style={{ backgroundImage: `url(${BG})` }}
      />
      <Card className="w-full max-w-md z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {formType === "login" ? "Admin Login" : "Forgot Password"}
          </CardTitle>
          <CardDescription>
            {formType === "login"
              ? "Enter your credentials to access your account"
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            {formType === "login" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    value={formData.password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            )}
            {formType === "login" ? (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setFormType("forgotPassword")}
                  className="text-sm text-[#B8A164] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setFormType("login")}
                  className="text-sm text-[#B8A164] hover:underline"
                >
                  Back to login
                </button>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isSigningIn || isForgotPassLoading}>
              {isSigningIn || isForgotPassLoading ? (
                <Loader2 className="animate-spin" />
              ) : formType === "login" ? (
                "Sign in"
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
          {formType === "login" && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/admin/signup"
                className="text-[#B8A164] hover:underline"
              >
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
