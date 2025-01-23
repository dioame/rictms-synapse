
  import { Button } from "@/Components/ui/button";
  import { SheetClose } from "@/Components/ui/sheet";

  export function Form(props : any) {

    return (
            <form onSubmit={props.submit} className="mt-4 space-y-6">
            
              {props.columns.map((column:any) => (
                <div key={column.name}>
                  {column.render(column.name, props.form)}
                </div>
              ))}

              <SheetClose asChild>
                <Button type="submit" disabled={props.form.processing} className="mt-4">
                  {props.form.processing ? (
                    <div className="mr-2 w-4 h-4 animate-spin" />
                  ) : (
                    `${props.method == 'POST' ? 'Create' : 'Update'} ${props.config.title}`
                  )}
                </Button>
              </SheetClose>
            </form>
    );
  }
  