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
  
  export function FeatureSheet(props : any) {
    const [features, setFeatures] = useState([{ value: "" }]); 

    // console.log(props.editData)
    
  useEffect(() => {
    if (props.editData.features) {
      setFeatures(props.editData.features.map((item: string) => ({ value: item })));
    } else {
      setFeatures([{ value: "" }]);
    }
  
  }, [props.editData]);
    
    const columns = [
        {
            name: "features",
            render: (labelName: any, formModel: any) => (
              <div key={labelName}>
                <Label className="text-primary" htmlFor={labelName}>
                  {labelName.replace(/_/g, " ").toUpperCase()}
                </Label>
                {features.map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Textarea
                      className="mt-1"
                      id={`features${index}`}
                      value={features[index].value}
                      onChange={(e) => {
                        const updatedFeatures = [...features];
                        updatedFeatures[index].value = e.target.value;
                        setFeatures(updatedFeatures);
                        formModel.setData(labelName, updatedFeatures.map((item) => item.value)); // Update form data as an array
                      }}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updatedFeatures = features.filter((_, i) => i !== index);
                          setFeatures(updatedFeatures);
                          formModel.setData(labelName, updatedFeatures.map((item) => item.value)); // Update form data as an array
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
                    setFeatures([...features, { value: "" }]);
                    formModel.setData(labelName, [...features, { value: "" }].map((item) => item.value)); // Update form data as an array
                  }}
                  className="text-blue-500 mt-2 inline-flex items-center border border-blue-500 rounded-md p-2"
                >
                  <Plus size={20} />
                  <span> Add Feature</span>
                </button>
                <InputError message={formModel.errors[labelName]} className="mt-2" />
              </div>
            ),
          },
       
      ];
  
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
        form.put(route(`${props.config.route}.update-features`,{id:props.editData.id}));
        setIsSubmit(true)
    };
  
    return (
      <SheetContent className="w-[400px] sm:w-[900px] sm:max-w-lg overflow-x-auto">
        <SheetHeader>
          <SheetTitle>Add Features</SheetTitle>
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
  