import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Dashboard({ auth, props }: PageProps) {
  return (
    <AuthenticatedLayout auth_user={auth.user}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl aspect-video bg-muted/50" />
        <div className="rounded-xl aspect-video bg-muted/50" />
        <div className="rounded-xl aspect-video bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
    </AuthenticatedLayout>
  );
}
