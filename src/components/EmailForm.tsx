import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Input,
  Tab,
  Textarea,
  FileInput,
  Text,
  Drawer,
  Modal,
  ActionIcon,
} from "rizzui";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import {
  singleEmailSchema,
  templateSchema,
} from "@/utils/validators/emailSchema";
import toast from "react-hot-toast";
import TemplateGallery from "./TemplateCard";
// import QuillEditor from "./ui/quill-editor";
import dynamic from "next/dynamic";
import { templates } from "@/data/template";
import { XMarkIcon } from "@heroicons/react/20/solid";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Dynamically import QuillEditor with SSR disabled
const QuillEditor = dynamic(() => import("./ui/quill-editor"), { ssr: false });

type SingleEmailInput = z.infer<typeof singleEmailSchema>;
type TemplateFormInputs = z.infer<typeof templateSchema>;

interface Template {
  id: string;
  title: string;
  content: string;
}

const EmailForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SingleEmailInput>({
    resolver: zodResolver(singleEmailSchema),
    defaultValues: {
      to: "",
      subject: "",
      body: "", 
      from: "",
    },
  });

  const {
    control: templateControl,
    handleSubmit: handleTemplateSubmit,
    setValue: setTemplateValue, // Aliasing setValue to setTemplateValue
    reset: resetTemplateForm,
  } = useForm<TemplateFormInputs>({
    // resolver: zodResolver(templateSchema),
    defaultValues: {
      templateTitle: "",
      templateContent: "", 
    },
  });

  // Toggle for the custom drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTemplateContent, setSelectedTemplateContent] = useState("");
  // Function to toggle the drawer's visibility
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onSubmitSingle: SubmitHandler<SingleEmailInput> = async (data) => {
    try {
      await fetch(`${apiUrl}/sendEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success(<Text as="b">Single email sent successfully!</Text>);
      reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Failed to send single email:", error);
      toast.error("Failed to send single email.");
    }
  };

  const isContentSafe = (content: string): boolean => {
    // Example regex that checks for script tags - this can be extended based on your needs
    const harmfulContentRegex = /<script.*?>.*?<\/script>/i;
    return !harmfulContentRegex.test(content);
  };

  const handleBulkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fileInput = event.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      toast.error("The file must be a CSV.");
      return;
    }

    Papa.parse(file, {
      complete: async (results) => {
        if (results.errors.length) {
          toast.error("There was an error processing your file.");
          console.error("CSV Parse Errors:", results.errors);
          return;
        }

        const emails = results.data.map((email: any) => ({
          recipientEmail: email.recipientEmail,
          subject: email.subject,
          body: email.body,
          from: email.from,
        }));

        // Enhanced Validation: Check for potentially harmful content in each field
        const isDataSafe = emails.every(
          (email) =>
            isContentSafe(email.recipientEmail) &&
            isContentSafe(email.subject) &&
            isContentSafe(email.body) &&
            isContentSafe(email.from)
        );

        if (!isDataSafe) {
          toast.error("CSV contains potentially harmful content.");
          return;
        }

        // Basic Validation: Check for any missing required fields in the data
        const isValid = emails.every(
          (email) =>
            email.recipientEmail && email.subject && email.body && email.from
        );

        if (!isValid) {
          toast.error(
            "All emails must include recipientEmail, subject, body, and from."
          );
          return;
        }

        try {
          const response = await fetch(`${apiUrl}/sendBulkEmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emails: emails }),
          });

          if (response.ok) {
            toast.success("Bulk Email sent successfully!");
            reset();
          } else {
            throw new Error("Bulk Email submission failed");
          }
        } catch (error) {
          console.error("Failed to send bulk Email:", error);
          toast.error("Failed to send bulk Email.");
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const downloadCsvTemplate = () => {
    const csvData =
      "recipientEmail,subject,body,from\nexample@example.com,Your Subject Here,Your message body here,Your Email Here\n";
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "bulk_email_template.csv");
  };

  // Template submission logic
  const onSubmitTemplate: SubmitHandler<TemplateFormInputs> = async (data) => {
    console.log("testing ...............");
    try {
      console.log(data);
      
      // Make a POST request to the API endpoint to create a new email template
      const response = await fetch(`${apiUrl}/notify/setEmailTemplate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.templateTitle, // Assuming `templateTitle` is the field name for the title in your form
          content: data.templateContent, // Assuming `templateContent` is the field name for the content in your form
        }),
      });
  
      if (!response.ok) {
        // If the API response is not ok, throw an error
        throw new Error('Failed to create template');
      }
  
      // Parse JSON response (optional, depending on what you want to do with the response)
      const responseData = await response.json();
  
      // Show success toast notification
      toast.success("Template saved successfully");
  
      // Optionally, perform actions based on response, like resetting the form
      resetTemplateForm();
    } catch (error) {
      console.error("Failed to save template:", error);
      toast.error("Failed to save template.");
    }
    resetTemplateForm();
  };

  // Function to handle editing a template
  const handleEditClick = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setEditingTemplate(template);
      setIsEditDrawerOpen(true);
    }
  };

  // Function to handle deleting a template
  const handleDeleteClick = (templateId: string) => {
    setTemplateToDelete(templateId);
    console.log("In handle delete");
    setIsDeleteModalOpen(true);
  };

  // Handler for saving changes after editing a template
  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the edited template goes here

    setIsEditDrawerOpen(false);
    // Optionally reset editingTemplate to null after saving
    setEditingTemplate(null);
  };

  // Handler for confirming deletion
  const handleDeleteConfirm = () => {
    // Implement logic to delete the template here
    // This might involve updating state or making an API call
    console.log("In handle delete confirm");
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setValue("body", selectedTemplateContent);
  }, [selectedTemplateContent, setValue]);

  return (
    <Tab>
      <Tab.List>
        <Tab.ListItem>Single Email</Tab.ListItem>
        <Tab.ListItem>Bulk Email</Tab.ListItem>
        <Tab.ListItem>Email Templates</Tab.ListItem>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <form onSubmit={handleSubmit(onSubmitSingle)} className="space-y-4">
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <Input
                  label="Recipient's Email"
                  {...field}
                  placeholder="Recipient's Email"
                />
              )}
            />
            {errors.to && <p>{errors.to.message}</p>}

            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Input label="Subject" {...field} placeholder="Subject" />
              )}
            />
            {errors.subject && <p>{errors.subject.message}</p>}
            <div className="flex justify-between items-center mb-4">
              {/* Using a standard HTML <label> element */}
              <label
                htmlFor="body"
                className="block text-sm font-medium text-gray-700"
              >
                Body
              </label>
              <Button onClick={() => setIsDrawerOpen(true)}>
                Choose Template
              </Button>
              <Drawer
                isOpen={isDrawerOpen}
                onClose={toggleDrawer}
                size="lg"
                overlayClassName="dark:bg-opacity-40 dark p-4 overflow-auto max-h-[calc(100vh-4rem)]"
                containerClassName="dark:bg-gray-100"
                className="z-[9999]"
              >
                <div className="p-6 overflow-auto max-h-[calc(100vh-4rem)]">
                  <h2 className="text-lg font-semibold mb-4">
                    Choose a Template
                  </h2>
                  <TemplateGallery
                    onSelectTemplate={setSelectedTemplateContent}
                    context="singleEmail"
                  />
                </div>
              </Drawer>
            </div>
            <Controller
              control={control}
              name="body"
              render={({ field: { onChange, value } }) => (
                <QuillEditor
                  value={value}
                  onChange={onChange}
                  className="col-span-full [&_.ql-editor]:min-h-[100px]"
                  labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                />
              )}
            />
            {errors.body && <p>{errors.body.message}</p>}

            <Controller
              name="from"
              control={control}
              render={({ field }) => (
                <Input
                  label="From"
                  {...field}
                  placeholder="From (Your Email)"
                />
              )}
            />
            {errors.from && <p>{errors.from.message}</p>}

            <Button type="submit">Send Email</Button>
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <FileInput label="Upload File" className="mb-2" />
            <Button type="submit">Send Bulk Email</Button>
            <br></br>
            <hr></hr>
            <Button onClick={downloadCsvTemplate}>Download CSV Template</Button>
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <Tab>
            <Tab.List>
              <Tab.ListItem>View Templates</Tab.ListItem>
              <Tab.ListItem>Create Template</Tab.ListItem>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {/* View Templates Content */}
                <>
                  <TemplateGallery
                    context="templateTab"
                    handleEditTemplate={handleEditClick}
                    handleDeleteTemplate={handleDeleteClick}
                  />
                  {isEditDrawerOpen && editingTemplate && (
                    <Drawer
                      isOpen={isEditDrawerOpen}
                      onClose={() => setIsEditDrawerOpen(false)}
                      size="lg"
                      overlayClassName="dark:bg-opacity-40 dark p-4 overflow-auto max-h-[calc(100vh-4rem)]"
                      containerClassName="dark:bg-gray-100"
                      className="z-[9999]"
                    >
                      <div className="p-6 overflow-auto max-h-[calc(100vh-4rem)]">
                        <h2 className="text-lg font-semibold mb-4">
                          Edit Template
                        </h2>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <form onSubmit={handleEditSave}>
                          <Input
                            label="Template Title"
                            defaultValue={editingTemplate.title}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                title: e.target.value,
                              })
                            }
                          />
                          <br></br>
                          <QuillEditor
                            id="quillEditor"
                            label="Template Content"
                            value={editingTemplate.content}
                            onChange={(content) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                content,
                              })
                            }
                          />
                          <br></br>
                          <br></br>
                          <Button type="submit">Save Changes</Button>
                        </form>
                      </div>
                    </Drawer>
                  )}

                  {isDeleteModalOpen && templateToDelete && (
                    <Modal
                      overlayClassName="dark:bg-opacity-40 dark p-4 overflow-auto max-h-[calc(100vh-4rem)]"
                      containerClassName="dark:bg-gray-100"
                      className="z-[9999]"
                      isOpen={isDeleteModalOpen}
                      onClose={() => setIsDeleteModalOpen(false)}
                      size="md"
                    >
                      <div className="m-auto px-7 pt-6 pb-8">
                        <div className="mb-7 flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            Confirm Deletion
                          </h3>{" "}
                          {/* Using standard <h3> tag */}
                          <ActionIcon
                            size="sm"
                            variant="text"
                            onClick={() => setIsDeleteModalOpen(false)}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </ActionIcon>
                        </div>
                        <div className="flex flex-col items-start justify-start">
                          <Text className="mb-4">
                            {" "}
                            Are you sure you want to delete this template?
                          </Text>
                          <div className="flex space-x-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsDeleteModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="danger"
                              onClick={handleDeleteConfirm}
                            >
                              {" "}
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  )}
                </>
              </Tab.Panel>
              <Tab.Panel>
                {/* Create Template Content */}
                <form 
                  onSubmit={handleTemplateSubmit(onSubmitTemplate)}
                  className="space-y-4"
                >
                  <Controller
                    name="templateTitle"
                    control={templateControl}
                    render={({ field }) => (
                      <Input
                        label="Template Title"
                        {...field}
                        placeholder="Template Title"
                      />
                    )}
                  />
                  <Controller
                    control={templateControl}
                    name="templateContent"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Template Content"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                  <Button type="submit">Create Template</Button>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab>
        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
};

export default EmailForm;
