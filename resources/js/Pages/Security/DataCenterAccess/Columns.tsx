
import { Input } from "@/Components/ui/input";
import { Select,SelectTrigger,SelectSeparator,SelectValue,SelectItem,SelectContent } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";

export const columns = [
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
            required
          />
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
        name: "company_name",
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
              required
            />
            <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
          </div>
        ),
      },
      {
        name: "contact_number",
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
              required
            />
            <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
          </div>
        ),
      },
      {
        name: "email_address",
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
              required
              type="email"
            />
            <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
          </div>
        ),
      },
          {
            name: "purpose_of_visit",
            render: (labelName:any, formModel:any) => (
              <div key={labelName}>
                <Label className="text-primary" htmlFor={labelName}>
                  {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */} * 
                </Label>
                <Textarea
                    className="mt-1"
                    id={labelName}
                    value={formModel.data[labelName]}
                    onChange={(e) => formModel.setData(labelName, e.target.value)}
                    placeholder={labelName}
                    required
                  />
                <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
              </div>
            ),
          },
              {
                name: "date_of_visit",
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
                      required
                    />
                    <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
                  </div>
                ),
              },
              {
                name: "duration_of_visit",
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
                      required
                    />
                    <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
                  </div>
                ),
              },
              {
                name: "proof_of_identity_presented",
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
                      required
                    />
                    <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
                  </div>
                ),
              },

    
  ];