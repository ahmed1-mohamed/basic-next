import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Developer } from "@/types/developer";
import { useCreateDeveloper } from "@/hooks/useCreateDeveloper";
import { useUpdateDeveloper } from "@/hooks/useUpdateDeveloper";
import { useDeveloper } from "@/hooks/useDeveloper";
import { toast } from "sonner";
import { Loader2, UploadCloud, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const developerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone_number: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  status: z.string().optional(),
  is_top: z.boolean().optional().default(false),
  logo: z.any().optional(),
});

type DeveloperFormValues = z.infer<typeof developerSchema>;

interface DeveloperFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer?: Developer | null;
}

export function DeveloperFormDialog({ open, onOpenChange, developer }: DeveloperFormDialogProps) {
  const createMutation = useCreateDeveloper();
  const updateMutation = useUpdateDeveloper();

  const isEditing = !!developer;
  
  // Fetch fresh data when editing to ensure form is fully populated
  const { data: freshDeveloper, isLoading: isFetchingFreshData } = useDeveloper(
    isEditing ? developer.id.toString() : ""
  );

  const form = useForm<DeveloperFormValues>({
    resolver: zodResolver(developerSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      website: "",
      description: "",
      status: "active",
      is_top: false,
      logo: undefined,
    },
  });

  // Sync form with data
  useEffect(() => {
    if (open) {
      // Prioritize fresh data, fallback to prop data, then empty
      const dataToUse = freshDeveloper || developer;
      if (dataToUse) {
        form.reset({
          name: dataToUse.name || "",
          email: dataToUse.email || "",
          phone_number: dataToUse.phone_number || "",
          website: dataToUse.website || "",
          description: dataToUse.description || "",
          status: dataToUse.status || "active",
          is_top: !!dataToUse.is_top,
          logo: undefined,
        });
      } else if (!isEditing) {
        form.reset({
          name: "",
          email: "",
          phone_number: "",
          website: "",
          description: "",
          status: "active",
          is_top: false,
          logo: undefined,
        });
      }
    } else {
      // Small timeout to not disrupt the close animation
      setTimeout(() => form.reset(), 200);
    }
  }, [open, developer, freshDeveloper, form, isEditing]);

  const onSubmit = async (data: DeveloperFormValues) => {
    try {
      if (isEditing && developer) {
        await updateMutation.mutateAsync({ id: developer.id, ...data });
        toast.success("Developer updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Developer created successfully");
      }
      onOpenChange(false);
    } catch (error: any) {
      if (error?.isValidationError && error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            form.setError(field as any, { type: "server", message: messages[0] });
          }
        });
        toast.error("Please fix the validation errors.");
      } else {
        toast.error(error?.message || "An error occurred. Please try again.");
      }
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const isLoading = isEditing && isFetchingFreshData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        <div className="p-6 bg-gray-50/50 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Developer" : "Add New Developer"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {isEditing
                ? "Update the details of the real estate developer below."
                : "Fill in the details to add a new developer to the system."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#0F7A6C] mb-4" />
              <p className="text-sm text-gray-500">Loading developer data...</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
                
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Basic Information</h3>
                  
                  <FormField
                    control={form.control as any}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Developer Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g. Palm Hills Developments" 
                            className="transition-all focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C] bg-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control as any}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="contact@developer.com" 
                              className="transition-all focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C] bg-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+1 234 567 890" 
                              className="transition-all focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C] bg-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control as any}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Website URL</FormLabel>
                          <FormControl>
                            <Input 
                              type="url" 
                              placeholder="https://example.com" 
                              className="transition-all focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C] bg-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all focus:ring-[#0F7A6C]/20 focus:border-[#0F7A6C] bg-white">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 my-6" />

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Additional Details</h3>

                  <FormField
                    control={form.control as any}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description about the developer's history, projects, etc..."
                            className="min-h-[120px] resize-none transition-all focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C] bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start pt-2">
                    <FormField
                      control={form.control as any}
                      name="logo"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Company Logo</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/jpeg,image/png,image/svg+xml"
                                className="pl-10 py-2 h-auto cursor-pointer file:cursor-pointer file:bg-gray-100 file:text-gray-700 file:border-0 file:rounded-md file:px-4 file:py-1 file:mr-4 file:hover:bg-gray-200 transition-all focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C]"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) onChange(file);
                                }}
                                name={field.name}
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                              <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="is_top"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-gray-200 p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => field.onChange(!field.value)}>
                          <FormControl>
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
                              checked={field.value}
                              onChange={field.onChange}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-medium text-gray-900 cursor-pointer flex items-center gap-2">
                              Top Developer <Star className={cn("h-4 w-4", field.value ? "fill-amber-400 text-amber-400" : "text-gray-400")} />
                            </FormLabel>
                            <p className="text-xs text-gray-500">
                              Mark this developer as featured or highly rated.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} className="bg-[#0F7A6C] hover:bg-[#005F54] text-white shadow-md shadow-[#0F7A6C]/20">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Developer"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
