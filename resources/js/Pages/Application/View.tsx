import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";

export default function Index({ auth,results }: any) {

  console.log(results)
  return (
    <AuthenticatedLayout auth_user={auth.user} header="Users">
      <Head title="Users" />
      <h1>test</h1>
    </AuthenticatedLayout>
  );
}
