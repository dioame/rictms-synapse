import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "@inertiajs/react";
import draftToHtml from "draftjs-to-html";
import * as React from "react";
import { cn } from "@/lib/utils";
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
  import { Button } from "@/Components/ui/button";
  import { Check, ChevronsUpDown } from "lucide-react";
  import { useEffect } from "react";
  import { toast } from "sonner";

const config = {
    title: "Secured Message",
};

export default function Index({ auth, users }: any) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { data, setData, post, processing, reset, errors, wasSuccessful, hasErrors } = useForm({
        user_id: "",
        expiration: "",
        message: "",
    });
    const [open, setOpen] = React.useState(false);
    const selectedItem = users.find((result: any) => result.id === data.user_id);
    const [isSubmit,setIsSubmit] = useState(false);
  

    useEffect(() => {
        setData("message", draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, [editorState]);

    useEffect(() => {
        if (wasSuccessful && isSubmit) {
          toast.success(`Success!`, {
            description: `${config.title} created successfully`,
            position: "top-center",
          });
        } else if(hasErrors) {
            toast.error('There are errors in the form', {
                description: 'Please fix them before submitting.',
                position: "top-center",
            });
        }
      }, [errors]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmit(true);

        post(route('secured-message.store'), {
            onSuccess: (response:any) => {
                console.log(response.props)
            },
        });
    };

    return (
        <AuthenticatedLayout auth_user={auth.user} header={config.title}>
            <div className="container p-6 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* User Select Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Secured Message For</label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[250px] justify-between border border-gray-300 rounded-lg"
                            >
                                {selectedItem ? selectedItem.name : "Select User"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0 border border-gray-300 shadow-lg bg-white rounded-lg">
                            <Command>
                                <CommandInput placeholder="Search Application" required className="border-b border-gray-300" />
                                <CommandList>
                                <CommandEmpty>No Data found.</CommandEmpty>
                                <CommandGroup>
                                    {users.map((result: any) => (
                                    <CommandItem
                                        key={result.id}
                                        onSelect={() => {
                                        setData("user_id", result.id);
                                        setOpen(false);
                                        }}
                                        className="hover:bg-gray-100 rounded-md px-2 border border-transparent hover:border-gray-300"
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            data.user_id === result.id ? "opacity-100" : "opacity-0"
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
                    </div>

                    {/* Expiration Date Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                        <input
                            type="date"
                            value={data.expiration}
                            onChange={(e) => setData("expiration", e.target.value)}
                            className="mt-1 block w-[250px] border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                            
                        />
                    </div>

                    {/* Editor */}
                    <div className=" bg-gray-50 p-10">
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="border border-gray-300 p-4 rounded-lg shadow-sm"
                            editorClassName="min-h-[200px] p-2 bg-white border border-gray-300 rounded-md"
                            toolbarClassName="border border-gray-300 bg-gray-100 p-2 rounded-md"
                            onEditorStateChange={setEditorState}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? "Submitting..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
