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
import { Plus, Trash2 } from "lucide-react";

export function EditSheet(props : any) {
  const [testProcedures, setTestProcedures] = useState([{ value: "" }]); // Initialize the array of test procedures
  const [expectedOutputs, setExpectedOutputs] = useState([{ value: "" }]); // Initialize the array of expected outputs

  useEffect(() => {
    if (props.editData.test_procedure) {
      setTestProcedures(props.editData.test_procedure.map((item: string) => ({ value: item })));
    } else {
      setTestProcedures([{ value: "" }]); // Default to empty if not present
    }
  
    if (props.editData.expected_result) {
      setExpectedOutputs(props.editData.expected_result.map((item: string) => ({ value: item })));
    } else {
      setExpectedOutputs([{ value: "" }]); // Default to empty if not present
    }
  }, [props.editData]); // This will run whenever props.editData changes

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
      name: "test_procedure",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()}
          </Label>
          {testProcedures.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                className="mt-1"
                id={`test_procedure_${index}`}
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
      name: "expected_result",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()}
          </Label>
          {expectedOutputs.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                className="mt-1"
                id={`expected_result_${index}`}
                value={expectedOutputs[index].value}
                onChange={(e) => {
                  const updatedOutputs = [...expectedOutputs];
                  updatedOutputs[index].value = e.target.value;
                  setExpectedOutputs(updatedOutputs);
                  formModel.setData(labelName, updatedOutputs.map((item) => item.value)); // Update form data as an array
                }}
                placeholder={`Expected Output ${index + 1}`}
              />
              {expectedOutputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedOutputs = expectedOutputs.filter((_, i) => i !== index);
                    setExpectedOutputs(updatedOutputs);
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
              setExpectedOutputs([...expectedOutputs, { value: "" }]);
              formModel.setData(labelName, [...expectedOutputs, { value: "" }].map((item) => item.value)); // Update form data as an array
            }}
            className="text-blue-500 mt-2 inline-flex items-center border border-blue-500 rounded-md p-2"
          >
            <Plus size={20} />
            <span> Add Expected Output</span>
          </button>
          <InputError message={formModel.errors[labelName]} className="mt-2" />
        </div>
      ),
    },
    {
      name: "test_status",
      render: (labelName: any, formModel: any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()}
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
  ];

  const [isSubmit,setIsSubmit] = useState(false);

  const columnNames = useMemo(() => {
    return columns.reduce((acc: any, column) => {
      if (column.name === "test_procedure") {
        // Handle test_procedure as an array of objects with a 'value' field
        acc[column.name] = testProcedures.map(item => item.value);
      } else if (column.name === "expected_result") {
        // Handle expected_result as an array of objects with a 'value' field
        acc[column.name] = expectedOutputs.map(item => item.value);
      } else {
        // For other columns, set values from props.editData or default to empty string
        acc[column.name] = props.editData[column.name] || "";
      }
      return acc;
    }, {});
  }, [props.editData, testProcedures, expectedOutputs]);

  columnNames['application_id'] = props.appId;
  const form = useForm(columnNames);

  useEffect(() => {
    if (props.editData) {
      form.setData((prevData:any) => ({
        ...prevData,
        ...props.editData, // Preserve previous form values while updating new ones
      }));
    }
  }, [props.editData]);

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
      form.put(route(`${props.config.route}.sqa.test-case.update`,{id:props.editData.id}));
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
