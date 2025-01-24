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
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "version",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
          </Label>
          <Input
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
    {
      name: "application_type",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
          </Label>
          <Select
            onValueChange={(value) => formModel.setData(labelName, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
            </SelectContent>
          </Select>
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
    {
      name: "frontend_language",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "frontend_framework",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "backend_language",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "backend_framework",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "sqa_status",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "repository",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "is_pia",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */} ?
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
      name: "author",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "developer",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "division",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "section",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "region",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "url",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "deployment_date",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
          </Label>
          <Input
            className="mt-1"
            id={labelName} // Using the dynamic labelName as the id
            type="date"
            value={formModel.data[labelName]} // Dynamic value based on labelName
            onChange={(e) => formModel.setData(labelName, e.target.value)} // Dynamic setData based on labelName
            placeholder={labelName}
            
          />
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
      name: "status",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
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
      name: "request_status",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */}
          </Label>
          <Select
           value={formModel.data[labelName]}
            onValueChange={(value) => formModel.setData(labelName, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    
    // You can add more column definitions here
  ];

  const [isSubmit,setIsSubmit] = useState(false);

  const columnNames = columns.reduce((acc:any, column) => {
    acc[column.name] = "";
    return acc;
  }, {});
  columnNames['request_status'] = "pending";

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
