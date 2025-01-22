import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/Components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useEffect } from "react";



export function CreateSheet({ roles }: any) {
  const { data, setData, post, processing, errors, reset, wasSuccessful } =
    useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "",
      avatar: {},
    });

  useEffect(() => {
    if (wasSuccessful) {
      handleReset();
    }
  }, [wasSuccessful]);

  const handleReset = () => {
    reset();
    // Reset any other form-related state here if needed
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // return;
    post(route("users.store"));
  };

  return (
    <SheetContent className="w-[400px] sm:w-[900px] sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Create User</SheetTitle>
        <SheetDescription>
          <div>
          <form onSubmit={submit} className="mt-4 space-y-6">
            <div>
              <Label className="text-primary" htmlFor="name">
                Name
              </Label>
              <Input
                className="mt-1"
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <Button type="submit" disabled={processing} className="mt-4">
              {processing ? (
                <div className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                "Create User"
              )}
            </Button>
          </form>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
