import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/Components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Form } from "./Form";

import { Input } from "@/Components/ui/input";
import { Select,SelectTrigger,SelectSeparator,SelectValue,SelectItem,SelectContent } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { toast } from "sonner";
import { columns } from "./Columns";

export function EditSheet(props : any) {
  
  const [isSubmit,setIsSubmit] = useState(false);

  const columnNames = useMemo(() => {
    return columns.reduce((acc: any, column) => {
      acc[column.name] = props.editData[column.name] || ""; // Default to an empty string if the key doesn't exist
      return acc;
    }, {});
  }, [props.editData]);

  const form = useForm(columnNames);

  useEffect(() => {
    form.setData(columnNames); // Update the form data with new `editData`
  }, [props.editData, columnNames]);

  useEffect(() => {
    if (form.wasSuccessful && isSubmit) { 
        toast.success(`Success!`, {
          description: `${props.config.title} updated successfully`,
          position: "top-center",
        });
        props.setIsSheetOpen(false);
    } else if(form.hasErrors) {
        toast.error('There are errors in the form', {
            description: 'Please fix them before submitting.',
            position: "top-center",
        });
    }
}, [form.errors]);

  const submit = (e: React.FormEvent) => {
      e.preventDefault();
      form.put(route(`${props.config.route}.update`,{id:props.editData.id}));
      setIsSubmit(true)
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
            method="PUT" 
            config={props.config}
            />
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
