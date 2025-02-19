"use client";

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

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signup(formData);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
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
          <CardTitle className="text-2xl font-bold ">
            Create Account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  type="email"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
            <Button type="submit" className="w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-[#B8A164] hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
