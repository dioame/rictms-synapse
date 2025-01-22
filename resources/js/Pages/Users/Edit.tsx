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
  

  export function EditUserSheet({ roles, editData }: any) {
    console.log(editData)
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
      useForm({
        name: editData.name,
        email: editData.email,
        role: editData.roles[0],
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
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
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
              <div>
                <Label className="text-primary" htmlFor="file">
                  Upload profile picture
                </Label>
                <Input
                  className="mt-1"
                  id="avatar"
                  type="file"
                  onChange={(e) => {
                    let files: any = e.target.files?.[0];
                    setData("avatar", files);
                  }}
                />
  
                <InputError message={errors.avatar} className="mt-2" />
              </div>
  
              <div className="mt-4">
                <Label className="text-primary" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="mt-1"
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4">
                <Label className="text-primary" htmlFor="role">
                  Role
                </Label>
                <Select onValueChange={(value) => setData("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role:any) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.role} className="mt-2" />
              </div>
  
              <Button type="submit" disabled={processing} className="mt-4">
                {processing ? (
                  <div className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  "Edit User"
                )}
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    );
  }
  