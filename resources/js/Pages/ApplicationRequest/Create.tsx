import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/Components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Form } from "./Form";
import { toast } from "sonner";
import { columns } from "./Columns";

export function CreateSheet(props : any) {

  const [isSubmit,setIsSubmit] = useState(false);

  const columnNames = columns.reduce((acc:any, column) => {
    acc[column.name] = "";
    return acc;
  }, {});

  // do not put value directly on the colums array specified here
  columnNames['version'] = "1.0";
  columnNames['request_status'] = "pending";
  columnNames['platform'] = "web";
  columnNames['system_owner'] = "Field Office Caraga";
  columnNames['accessibility'] = "private";
  columnNames['development_strategy'] = "in-house";
  columnNames['computing_scheme'] = "on-premise";
  columnNames['sqa_tested'] = "0";
  columnNames['is_pia'] = "0";
  columnNames['is_km'] = "0";
  columnNames['status'] = "development";

  const form = useForm(columnNames);

  useEffect(() => {
      if (Object.keys(form.errors).length === 0) { 
          toast.success(`Success!`, {
              description: `${props.config.title} created successfully`,
              position: "top-center",
          });
          props.setIsSheetOpen(false);
      } else {
          toast.error('There are errors in the form', {
              description: 'Please fix them before submitting.',
              position: "top-center",
          });
      }
  }, [form.errors]);

  const submit = (e: React.FormEvent) => {
      e.preventDefault();
      form.post(route(`${props.config.route}.store`));
  };

  return (
    <SheetContent className="w-[400px] sm:w-[900px] sm:max-w-lg overflow-x-auto">
      <SheetHeader>
        <SheetTitle>Create {props.config.title}</SheetTitle>
        <SheetDescription>
          <div>
            <Form 
            columns={columns}
            submit={submit}
            form={form} 
            method="POST" 
            config={props.config}
            />
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
