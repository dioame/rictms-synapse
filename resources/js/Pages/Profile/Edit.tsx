import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { PageProps } from "@/types";

import UpdateAvatarForm from "./Partials/UpdateAvatarForm";

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout auth_user={auth.user} header={"Settings"}>
      <div className="  w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="grid gap-6">
          <UpdateAvatarForm user={auth.user} />

          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
            user={auth.user}
            isAuthUser={true}
          />

          <UpdatePasswordForm className="max-w-xl" />

          <DeleteUserForm className="max-w-xl" />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
