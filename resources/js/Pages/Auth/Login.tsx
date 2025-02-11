import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { useEffect, FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { CircleArrowRight } from "lucide-react";


export default function LoginForm({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Se connecter" />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your SyNapse or MyPortal credential below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={data.username}
                  placeholder="Username/Email"
                  autoComplete="username"
                  required
                  onChange={(e) => setData("username", e.target.value)}
                />
                <InputError message={errors.username} className="mt-2" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <Link href={route("password.request")} className="inline-block ml-auto text-sm underline">
                      Forgot your password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={data.password}
                  placeholder="Password"
                  className="block mt-1 w-full"
                  autoComplete="current-password"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = route("google.login"))}
              >
                {/* Google logo image */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                Login with Google
              </Button>

              
            </div>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  );
}
