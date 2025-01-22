import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <Card>
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            No problem. Just let us know your email address and we will email
            you a password reset link that will allow you to choose a new one.
          </CardDescription>
        </CardHeader>
        {status && (
          <div className="mb-4 text-sm font-medium text-green-600">
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <CardContent>
            <Input
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="block mt-1 w-full"
              onChange={(e) => setData("email", e.target.value)}
            />

            <InputError message={errors.email} className="mt-2" />
          </CardContent>
        </form>
        <CardFooter className="px-6 py-4 border-t">
          {/* add secondary button to cancel and return */}
          <Button
            className="mr-2"
            variant={"secondary"}
            onClick={() => {
              history.back();
            }}
          >
            Cancel
          </Button>
          <Button onClick={submit}>Email Password Reset Link</Button>
        </CardFooter>
      </Card>
    </GuestLayout>
  );
}
