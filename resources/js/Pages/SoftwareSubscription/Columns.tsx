import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Components/ui/textarea";
import { Select,SelectTrigger,SelectSeparator,SelectValue,SelectItem,SelectContent } from "@/Components/ui/select";


export const columns = [
    {
      name: "software_name",
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
        name: "license_key",
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
        name: "subscriber_name",
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
        name: "subscriber_email",
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
        name: "subscriber_type",
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
        name: "start_date",
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
        name: "end_date",
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
          name: "is_active",
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
                  <SelectItem value="1">Yes</SelectItem>
                  <SelectItem value="0">No</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
            </div>
          ),
        },
    
    
    // You can add more column definitions here
  ];