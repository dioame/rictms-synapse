"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm,router } from "@inertiajs/react";

const config = {
  title: "SQA Test Plan",
};

export default function Index({ auth, results }: any) {
  const [open, setOpen] = React.useState(false);

  const { data, setData, post, processing, errors, reset, wasSuccessful } =
    useForm({
      selected_id: "",
    });

  const selectedItem = results.find((result: any) => result.id === data.selected_id);
  
  const handleSubmit = () => {
    if (selectedItem) {
      const url = route("reports.sqa-test-plan-generate", { id: selectedItem.id });
      window.open(url, "_blank");
    }
  };

  return (
    <AuthenticatedLayout auth_user={auth.user} header={config.title}>
      <div className="flex flex-col items-center justify-center p-10" >
        <div className="space-y-4 border border-gray-300 rounded-lg p-6 w-[300px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[250px] justify-between border border-gray-300 rounded-lg"
              >
                {selectedItem ? selectedItem.name : "Select Application"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 border border-gray-300 shadow-lg bg-white rounded-lg">
              <Command>
                <CommandInput placeholder="Search Application" className="border-b border-gray-300" />
                <CommandList>
                  <CommandEmpty>No Data found.</CommandEmpty>
                  <CommandGroup>
                    {results.map((result: any) => (
                      <CommandItem
                        key={result.id}
                        onSelect={() => {
                          setData("selected_id", result.id);
                          setOpen(false);
                        }}
                        className="hover:bg-gray-100 rounded-md px-2 border border-transparent hover:border-gray-300"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            data.selected_id === result.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {result.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            className="w-[250px] border border-gray-300 rounded-lg"
            onClick={handleSubmit}
            disabled={!selectedItem || processing}
          >
            {processing ? "Submitting..." : "Confirm Selection"}
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
