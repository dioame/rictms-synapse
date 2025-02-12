import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Components/ui/textarea";
import { Select,SelectTrigger,SelectSeparator,SelectValue,SelectItem,SelectContent } from "@/Components/ui/select";


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
          />
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
      name: "abbr",
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
      name: "description",
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
            />
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
      name: "tech_stack",
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
    {
      name: "is_km",
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
          <Select
           value={formModel.data[labelName]}
            onValueChange={(value) => formModel.setData(labelName, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="testing">Testing (QA/Regression)</SelectItem>
              <SelectItem value="uat">User Acceptance Testing (UAT)</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production (Prod)</SelectItem>
            </SelectContent>
          </Select>
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
    {
      name: "requirement_remarks",
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
      name: "accessibility",
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
              <SelectItem value="private">Privately Accessible Applications</SelectItem>
              <SelectItem value="public">Publicly Accessible Applications</SelectItem>
            </SelectContent>
          </Select>
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
      name: "development_strategy",
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
              <SelectItem value="in-house">In-house</SelectItem>
              <SelectItem value="outsource">Outsource</SelectItem>
              <SelectItem value="co-develop">Co-develop</SelectItem>
            </SelectContent>
          </Select>
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
      name: "platform",
      render: (labelName:any, formModel:any) => (
        <div key={labelName}>
          <Label className="text-primary" htmlFor={labelName}>
            {labelName.replace(/_/g, " ").toUpperCase()} {/* Replace _ with space */} *
          </Label>
          <Select
           value={formModel.data[labelName]}
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
      name: "computing_scheme",
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
              <SelectItem value="on-premise">On-premise</SelectItem>
              <SelectItem value="cloud">Cloud</SelectItem>
            </SelectContent>
          </Select>
          <InputError message={formModel.errors[labelName]} className="mt-2" /> {/* Dynamic error */}
        </div>
      ),
    },
    {
      name: "internal_users",
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
      name: "no_of_internal_users",
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
      name: "external_users",
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
      name: "no_of_external_users",
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
      name: "system_owner",
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
      name: "location_of_deployment",
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
      name: "hostname_of_database",
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
      name: "database_ip_address",
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
      name: "description_general_contents",
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
      name: "information_systems_served",
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
      name: "data_archiving",
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
      name: "sqa_tested",
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