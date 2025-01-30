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
  
  export function AttachmentSheet(props : any) {
    const columns:any = [];
    // Iterate over the keys in props.LibDeploymentReq
    for (let key in props.LibDeploymentReq) {
      if (props.LibDeploymentReq.hasOwnProperty(key)) {
        columns.push({
          name: key, // Use the dynamic key name from props.LibDeploymentReq
          render: (labelName: any, formModel: any) => (
            <div key={labelName}>
              <Label className="text-primary" htmlFor={labelName}>
                {props.LibDeploymentReq[key]['name'].toUpperCase()}
              </Label>
              <Input
                className="mt-1"
                type="file"
                id={labelName} // Using the dynamic labelName as the id=
                onChange={(e) => {
                  let files: any = e.target.files?.[0];
                  formModel.setData(labelName, {file: files, id: props.LibDeploymentReq[key]['id']})
                }} // Dynamic setData based on labelName
              />
              <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
            </div>
          ),
        });
      }
    }
  
  
    const [isSubmit,setIsSubmit] = useState(false);
  
    const columnNames = useMemo(() => {
      return columns.reduce((acc: any, column:any) => {
        acc[column.name] = props.editData[column.name] || {}; // Default to an empty string if the key doesn't exist
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
        form.post(route(`${props.config.route}.update-attachment`,{id:props.editData.id}));
        setIsSubmit(true)
    };
  
    return (
      <SheetContent className="w-[400px] sm:w-[900px] sm:max-w-lg overflow-x-auto">
        <SheetHeader>
          <SheetTitle>Attachment {props.config.title}</SheetTitle>
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
  