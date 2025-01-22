import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.store"));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />
      <Card>
        <CardHeader>
          <CardTitle>Reset Password?</CardTitle>
          <CardDescription>
            No problem. Just let us know your email address and we will email
            you a password reset link that will allow you to choose a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="block mt-1 w-full"
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="block mt-1 w-full"
                autoComplete="new-password"
                onChange={(e) => setData("password", e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="block mt-1 w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
              />
              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="px-6 py-4 border-t">
          <Button className="" onClick={submit} disabled={processing}>
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </GuestLayout>
  );
}
