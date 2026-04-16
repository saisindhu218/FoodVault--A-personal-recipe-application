import { useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authApi } from "@/lib/mongodb-api";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTemporaryPassword(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const data = await authApi.forgotPassword(email);
      setTemporaryPassword(data.temporaryPassword);
      toast.success("Temporary password generated");
    } catch (error: any) {
      toast.error(error.message || "Unable to generate password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">FoodVault</h1>
          </div>
          <p className="text-muted-foreground">Reset your account access</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email to get a temporary password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input id="forgot-email" name="email" type="email" required />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Generating..." : "Get Password"}
              </Button>
            </form>

            {temporaryPassword && (
              <div className="rounded-md border bg-secondary/30 p-3">
                <p className="text-sm text-muted-foreground">Your temporary password:</p>
                <p className="text-base font-semibold tracking-wide">{temporaryPassword}</p>
              </div>
            )}

            <div className="text-center">
              <Link to="/auth" className="text-sm text-primary hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
