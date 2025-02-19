import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BG from "@/assets/img/asset-1.png";
import { CardDescription } from "@/components/ui/card";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { resetPassword, isResetPassLoading } = useAuthStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(token, password);
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center justify-center bg-[#1B2A4A] bg-cover bg-center bg-no-repeat px-4 py-20 relative min-h-[80vh]">
      <div
        className={`absolute inset-0 bg-cover bg-center opacity-20`}
        style={{ backgroundImage: `url(${BG})` }}
      />{" "}
      <Card className="w-full max-w-md z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Reset Admin Password
          </CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="New Password"
              className="mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isResetPassLoading}
            >
              {isResetPassLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
