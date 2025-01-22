import { useForm } from "@inertiajs/react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getInitials } from "@/hooks/helpers";
import { User } from "@/types";

function UpdateAvatarForm({ user }: { user: User }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, errors, reset, progress } = useForm({
    avatar: null as File | null,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setData("avatar", file);
    }
  };

  const submit = () => {
    post(route("profile.avatar.update", { id: user.id }), {
      preserveScroll: true,
      onSuccess: () => {
        reset("avatar");
        setPreview(user.avatar ? `/storage/avatars/${user.avatar}` : null);
        console.log(preview);
        // Reset preview after successful upload
        toast.success("Avatar updated successfully", {
          description: "Your profile picture has been updated",
          position: "top-center",
        });
      },
      onError: () => {
        toast.error("Failed to update avatar");
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Click on the avatar to upload a custom one from your files.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="w-14 h-14 cursor-pointer">
              <AvatarImage
                className="object-cover"
                src={
                  preview ||
                  (user.avatar ? `/storage/avatars/${user.avatar}` : "")
                }
                alt={user.name}
              />
              <AvatarFallback className="text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Accepted formats: .jpg, .jpeg, .png
              <br />
              Maximum file size: 2MB
            </div>
          </div>
        </div>

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />

        {errors.avatar && (
          <div className="text-sm text-destructive">{errors.avatar}</div>
        )}

        {progress && (
          <div className="w-full h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full transition-all bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <Button onClick={submit} disabled={!data.avatar || processing}>
          {processing ? "Uploading..." : "Update Avatar"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UpdateAvatarForm;
