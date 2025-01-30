import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/Components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Form } from "./Form";

import { Input } from "@/Components/ui/input";
import { Select,SelectTrigger,SelectSeparator,SelectValue,SelectItem,SelectContent } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { toast } from "sonner";

export function CreateSheet(props : any) {

  const columns = [
    {
      name: "name",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */} *
          </Label>
          <Input
            className="mt-1"
            id={labelName} // Using the dynamic labelName as the id
            value={formModel.data[labelName]} // Dynamic value based on labelName
            onChange={(e) => formModel.setData(labelName, e.target.value)} // Dynamic setData based on labelName
            placeholder={labelName}
          />
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
          name: "description",
          render: (labelName:any, formModel:any) => (
            <div key={labelName}>
              <Label className="text-primary" htmlFor={labelName}>
                {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
              </Label>
              <Textarea
                  className="mt-1"
                  id={labelName}
                  value={formModel.data[labelName]}
                  onChange={(e) => formModel.setData(labelName, e.target.value)}
                  placeholder={labelName}
                />
              <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
            </div>
          ),
        },
  ];

  const columnNames = columns.reduce((acc:any, column) => {
    acc[column.name] = "";
    return acc;
  }, {});

  const form = useForm(columnNames);

  useEffect(() => {
    console.log(form.errors)
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
