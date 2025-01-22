import { useRef, FormEventHandler } from "react";

import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label";

import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

export default function UpdatePasswordForm({
  className = "",
  isAdmin = false,
}: {
  className?: string;
  isAdmin?: boolean;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const handleClick: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="mt-6 space-y-6">
          {!isAdmin ? (
            <div>
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                ref={currentPasswordInput}
                value={data.current_password}
                onChange={(e) => setData("current_password", e.target.value)}
                type="password"
                className="block mt-1 w-full"
                autoComplete="current-password"
              />
              <InputError message={errors.current_password} className="mt-2" />
            </div>
          ) : null}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              type="password"
              className="block mt-1 w-full"
              autoComplete="new-password"
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              type="password"
              className="block mt-1 w-full"
              autoComplete="new-password"
            />
            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <Button onClick={handleClick} disabled={processing}>
          Save
        </Button>
        <Transition
          show={recentlySuccessful}
          enter="transition ease-in-out"
          enterFrom="opacity-0"
          leave="transition ease-in-out"
          leaveTo="opacity-0"
        >
          <p className="ml-5 text-sm text-gray-600">Saved.</p>
        </Transition>
      </CardFooter>
    </Card>
  );
}
