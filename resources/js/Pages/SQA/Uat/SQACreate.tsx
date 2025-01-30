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
import { Select, SelectTrigger, SelectSeparator, SelectValue, SelectItem, SelectContent } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export function CreateSheet(props: any) {
  const [testProcedures, setTestProcedures] = useState([{ value: "" }]); // Initialize the array of test procedures
  const [requirements, setRequirements] = useState([{ value: "" }]); // Initialize the array of expected outputs

  const columns = [
    {
      name: "application_id",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Input
            className="mt-1"
            id={labelName}
            value={formModel.data[labelName]}
            onChange={(e) => formModel.setData(labelName, e.target.value)}
            placeholder={labelName}
            readOnly
            hidden
            style={{ display: "none" }}
          />
        </div>
      ),
    },
    {
      name: "module",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} *
          </Label>
          <Input
            className="mt-1"
            id={labelName}
            value={formModel.data[labelName]}
            onChange={(e) => formModel.setData(labelName, e.target.value)}
            placeholder={labelName}
          />
          <InputError message={formModel.errors[labelName]} className="mt-2" />
        </div>
      ),
    },
    {
      name: "procedure",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()}
          </Label>
          {testProcedures.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                className="mt-1"
                id={`procedure_${index}`}
                value={testProcedures[index].value}
                onChange={(e) => {
                  const updatedProcedures = [...testProcedures];
                  updatedProcedures[index].value = e.target.value;
                  setTestProcedures(updatedProcedures);
                  formModel.setData(labelName, updatedProcedures.map((item) => item.value)); // Update form data as an array
                }}
                placeholder={`Test Procedure ${index + 1}`}
              />
              {testProcedures.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedProcedures = testProcedures.filter((_, i) => i !== index);
                    setTestProcedures(updatedProcedures);
                    formModel.setData(labelName, updatedProcedures.map((item) => item.value)); // Update form data as an array
                  }}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setTestProcedures([...testProcedures, { value: "" }]);
              formModel.setData(labelName, [...testProcedures, { value: "" }].map((item) => item.value)); // Update form data as an array
            }}
            className="text-blue-500 mt-2 inline-flex items-center border border-blue-500 rounded-md p-2"
          >
            <Plus size={20} />
            <span> Add Procedure</span>
          </button>
          <InputError message={formModel.errors[labelName]} className="mt-2" />
        </div>
      ),
    },
    {
      name: "requirements",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()}
          </Label>
          {requirements.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                className="mt-1"
                id={`requirements_${index}`}
                value={requirements[index].value}
                onChange={(e) => {
                  const updatedOutputs = [...requirements];
                  updatedOutputs[index].value = e.target.value;
                  setRequirements(updatedOutputs);
                  formModel.setData(labelName, updatedOutputs.map((item) => item.value)); // Update form data as an array
                }}
                placeholder={`Requirements ${index + 1}`}
              />
              {requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedOutputs = requirements.filter((_, i) => i !== index);
                    setRequirements(updatedOutputs);
                    formModel.setData(labelName, updatedOutputs.map((item) => item.value)); // Update form data as an array
                  }}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setRequirements([...requirements, { value: "" }]);
              formModel.setData(labelName, [...requirements, { value: "" }].map((item) => item.value)); // Update form data as an array
            }}
            className="text-blue-500 mt-2 inline-flex items-center border border-blue-500 rounded-md p-2"
          >
            <Plus size={20} />
            <span> Add Requirements</span>
          </button>
          <InputError message={formModel.errors[labelName]} className="mt-2" />
        </div>
      ),
    },
      {
          name: "test_result",
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
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="conditional_passed">Conditional Passed</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
            </div>
          ),
        },
        {
          name: "remarks",
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
          name: "retesting_result",
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

  const columnNames = columns.reduce((acc: any, column) => {
    acc[column.name] = "";
    return acc;
  }, {});

  columnNames['application_id'] = props.appId;

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
    form.post(route(`${props.config.route}.sqa.uat.store`));
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
