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
  const { application, results } = usePage<any>().props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = (value:any) => {
    setIsOpen(!isOpen);
  };

  const [testResults, setTestResults] = useState(
    results.map((item:any) => ({
      id: item.id,
      module: item.module,
      procedure: JSON.parse(item.procedure),
      requirements: JSON.parse(item.requirements),
      test_result: item.test_result,
      remarks: item.remarks,
      retesting_result: item.retesting_result,
    }))
  );

  const handleChange = (index:any, field:any, value:any) => {
    const updatedResults = [...testResults];
    updatedResults[index][field] = value;
    setTestResults(updatedResults);
  };

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
  };

  return (
    <UatLayout>
      {application.status !== 'uat' && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md">
          <h1 className="font-bold text-lg">Application is not yet in User Acceptance Testing (UAT) or has already been completed.</h1>
        </div>
      )}


      { application.status == 'uat' && 
      <div>
        <Card className="max-w-full sm:max-w-4xl mx-auto shadow-lg border border-gray-200 mt-10 dark:border-gray-700">
          <CardHeader className="bg-gray-100 p-5 rounded-t-lg dark:bg-gray-800">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              🛠 User Acceptance Testing (UAT)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <h1 className="flex justify-center items-center gap-2 text-center text-teal-500 font-bold text-lg md:text-2xl dark:text-teal-300">
              {application.name} ({application.abbr})
            </h1>
            <p className="mb-5 flex justify-center items-center gap-2 text-center text-sm md:text-base dark:text-gray-300">{application.description}</p>
      
            <form onSubmit={handleSubmit} className="space-y-6">
              {testResults.map((item: any, index: any) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-300 space-y-4 dark:bg-gray-900 dark:border-gray-600">
                  {/* Readonly Fields */}
                  <div>
                    <Label className="text-gray-700 font-medium dark:text-gray-300">📌 Module</Label>
                    <Input value={item.module} readOnly className="bg-gray-100 w-full dark:bg-gray-800 dark:text-gray-200" />
                  </div>
      
                  {/* Procedure (Parsed JSON) */}
                  <div>
                    <Label className="text-gray-700 font-medium dark:text-gray-300">🔍 Procedure</Label>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                      {Array.isArray(item.procedure) ? (
                        <ul className="list-disc pl-5">
                          {item.procedure.map((step: any, i: any) => (
                            <li key={i} className="text-gray-600 text-sm md:text-base dark:text-gray-400">{step}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 text-sm md:text-base dark:text-gray-400">{item.procedure}</p>
                      )}
                    </div>
                  </div>
      
                  {/* Requirements (Parsed JSON) */}
                  <div>
                    <Label className="text-gray-700 font-medium dark:text-gray-300">⚙️ Requirements</Label>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                      {Array.isArray(item.requirements) ? (
                        <ul className="list-disc pl-5">
                          {item.requirements.map((req: any, i: any) => (
                            <li key={i} className="text-gray-600 text-sm md:text-base dark:text-gray-400">{req}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 text-sm md:text-base dark:text-gray-400">{item.requirements}</p>
                      )}
                    </div>
                  </div>
      
                  {/* Test Result, Remarks, and Retesting Result (Editable Fields) */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-700 font-medium dark:text-gray-300">TEST RESULT</Label>
                      <Select
                        value={item.test_result}
                        onValueChange={(value) => handleChange(index, 'test_result', value)}
                      >
                        <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
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
                      <Label className="text-gray-700 font-medium dark:text-gray-300">Remarks</Label>
                      <Textarea
                        value={item.remarks}
                        onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
      
                    <div>
                      <Label className="text-gray-700 font-medium dark:text-gray-300">Retesting Result</Label>
                      <Input
                        type="text"
                        value={item.retesting_result}
                        onChange={(e) => handleChange(index, 'retesting_result', e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                  </div>
      
                  {/* Separator to distinguish between different test cases */}
                  {index < testResults.length - 1 && <Separator />}
                </div>
              ))}
      
              {/* Submit Button */}
              <Button type="submit" className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg dark:bg-blue-700 dark:hover:bg-blue-600">
                Submit UAT Responses
              </Button>
              <Button className="w-full py-3 bg-teal-600 text-white hover:bg-blue-700 rounded-lg dark:bg-teal-700 dark:hover:bg-teal-600" onClick={(e) => { e.preventDefault(); setIsOpen(true) }}>
                View UAT Responses
              </Button>
            </form>
          </CardContent>
        </Card>
      
        <Dialog open={isOpen} onOpenChange={toggleDialog}>
          <DialogContent className="sm:max-w-[800px] max-w-full max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>UAT Submission</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              {results.map((item: any, index: any) => (
                <div key={index} className="card border p-4 mb-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold dark:text-gray-200">Module: {item.module}</h3>
                  <div className="text-md my-2 dark:text-gray-200">
                    <div className="space-y-4">
                      <div className="text-md">
                        <strong className="text-lg font-semibold dark:text-gray-300">Procedure:</strong>
                        <ul className="list-disc pl-6 text-sm text-gray-800 space-y-2 dark:text-gray-400">
                          {item.procedure &&
                            JSON.parse(item.procedure).map((step: any, index: any) => (
                              <li key={index}>{step}</li>
                            ))}
                        </ul>
                      </div>

                      <div className="text-md">
                        <strong className="text-lg font-semibold dark:text-gray-300">Requirements:</strong>
                        <ul className="list-disc pl-6 text-sm text-gray-800 space-y-2 dark:text-gray-400">
                          {item.requirements &&
                            JSON.parse(item.requirements).map((req: any, index: any) => (
                              <li key={index}>{req}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-md my-2 dark:text-gray-200">
                    <strong>Results:</strong> {item.test_result}
                  </div>
                  <div className="text-md my-2 dark:text-gray-200">
                    <strong>Remarks:</strong> {item.remarks}
                  </div>
                  <div className="text-md my-2 dark:text-gray-200">
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
      </div>
      }
    </UatLayout>
  );
}
