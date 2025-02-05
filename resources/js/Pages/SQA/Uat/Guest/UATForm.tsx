import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Separator } from "@/Components/ui/separator";
import { Select, SelectTrigger, SelectSeparator, SelectValue, SelectItem, SelectContent } from "@/Components/ui/select";
import { toast } from "sonner";
import UatLayout from "@/Layouts/UatLayout";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/Components/ui/dialog"


  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table"
  import { Inertia } from '@inertiajs/inertia';

export default function UATForm() {
  const { application, results } = usePage<any>().props; // Get UAT data from Inertia
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = (value:any) => {
    setIsOpen(!isOpen);
  };

  // Initialize state for editable test results
  const [testResults, setTestResults] = useState(
    results.map((item:any) => ({
      id: item.id, // Keep track of the original record
      module: item.module,
      procedure: JSON.parse(item.procedure), // Parse JSON for procedure
      requirements: JSON.parse(item.requirements), // Parse JSON for requirements
      test_result: item.test_result,
      remarks: item.remarks,
      retesting_result: item.retesting_result,
    }))
  );

  // Handle input change for test results
  const handleChange = (index:any, field:any, value:any) => {
    const updatedResults = [...testResults];
    updatedResults[index][field] = value;
    setTestResults(updatedResults);
  };


  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    router.post(route('client-uat-post'), { testResults }, {
      onSuccess: () => {
        toast.success(`Success!`, {
            description: `UAT submitted successfully`,
            position: "top-center",
          });
      }
    });
}

  return (
    <UatLayout>
    <Card className="max-w-full sm:max-w-4xl mx-auto shadow-lg border border-gray-200 mt-10">
      <CardHeader className="bg-gray-100 p-5 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-gray-800">
          🛠 User Acceptance Testing (UAT)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <h1 className="flex justify-center items-center gap-2 text-center text-teal-500 font-bold text-lg md:text-2xl">
          {application.name} ({application.abbr})
        </h1>
        <p className="mb-5 flex justify-center items-center gap-2 text-center text-sm md:text-base">{application.description}</p>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {testResults.map((item: any, index: any) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-300 space-y-4">
              {/* Readonly Fields */}
              <div>
                <Label className="text-gray-700 font-medium">📌 Module</Label>
                <Input value={item.module} readOnly className="bg-gray-100 w-full" />
              </div>
  
              {/* Procedure (Parsed JSON) */}
              <div>
                <Label className="text-gray-700 font-medium">🔍 Procedure</Label>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
                  {Array.isArray(item.procedure) ? (
                    <ul className="list-disc pl-5">
                      {item.procedure.map((step: any, i: any) => (
                        <li key={i} className="text-gray-600 text-sm md:text-base">{step}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm md:text-base">{item.procedure}</p>
                  )}
                </div>
              </div>
  
              {/* Requirements (Parsed JSON) */}
              <div>
                <Label className="text-gray-700 font-medium">⚙️ Requirements</Label>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
                  {Array.isArray(item.requirements) ? (
                    <ul className="list-disc pl-5">
                      {item.requirements.map((req: any, i: any) => (
                        <li key={i} className="text-gray-600 text-sm md:text-base">{req}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm md:text-base">{item.requirements}</p>
                  )}
                </div>
              </div>
  
              {/* Test Result, Remarks, and Retesting Result (Editable Fields) */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-medium">TEST RESULT</Label>
                  <Select
                    value={item.test_result}
                    onValueChange={(value) => handleChange(index, 'test_result', value)}
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
                      <SelectValue placeholder="Select Result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="conditional_passed">Conditional Passed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                <div>
                  <Label className="text-gray-700 font-medium">Remarks</Label>
                  <Textarea
                    value={item.remarks}
                    onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
  
                <div>
                  <Label className="text-gray-700 font-medium">Retesting Result</Label>
                  <Input
                    type="text"
                    value={item.retesting_result}
                    onChange={(e) => handleChange(index, 'retesting_result', e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              </div>
  
              {/* Separator to distinguish between different test cases */}
              {index < testResults.length - 1 && <Separator />}
            </div>
          ))}
  
          {/* Submit Button */}
          <Button type="submit" className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
            Submit UAT Responses
          </Button>
          <Button className="w-full py-3 bg-teal-600 text-white hover:bg-blue-700 rounded-lg" onClick={(e) => { e.preventDefault(); setIsOpen(true) }}>
            View UAT Responses
          </Button>
        </form>
      </CardContent>
    </Card>
  
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[800px] max-w-full">
        <DialogHeader>
          <DialogTitle>UAT Submission</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
        {results.map((item:any, index:any) => (
        <div key={index} className="card border p-4 mb-4">
            <h3 className="text-xl font-semibold">Module: {item.module}</h3>
            <div className="text-md my-2">
            <div className="space-y-4">
        <div className="text-md">
            <strong className="text-lg font-semibold">Procedure:</strong>
            <ul className="list-disc pl-6 text-sm text-gray-800 space-y-2">
            {item.procedure && JSON.parse(item.procedure).map((step:any, index:any) => (
                <li key={index}>{step}</li>
            ))}
            </ul>
        </div>

        <div className="text-md">
            <strong className="text-lg font-semibold">Requirements:</strong>
            <ul className="list-disc pl-6 text-sm text-gray-800 space-y-2">
            {item.requirements && JSON.parse(item.requirements).map((req:any, index:any) => (
                <li key={index}>{req}</li>
            ))}
            </ul>
        </div>
        </div>

            </div>
            <div className="text-md my-2">
            <strong>Results:</strong> {item.test_result}
            </div>
            <div className="text-md my-2">
            <strong>Remarks:</strong> {item.remarks}
            </div>
            <div className="text-md my-2">
            <strong>Re-testing:</strong> {item.retesting_result}
            </div>
        </div>
        ))}

        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  
  </UatLayout>
  );
}
