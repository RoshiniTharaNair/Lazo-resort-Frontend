'use client';

import React, { useState, useEffect } from "react";
import { Title, Text, Button } from "rizzui";
import Link from "next/link";
import Pagination from "./ui/pagination";
import { useForm } from "react-hook-form";
import { templates } from "@/data/template";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Template {
  templateId: string;
  title: string;
  content: string;
}

interface TemplateCardProps {
  template: Template;
  context: "singleEmail" | "templateTab";
  onSelectTemplate?: (content: string) => void;
  handleEditTemplate?: (templateId: string) => void;
  handleDeleteTemplate?: (templateId: string) => void;
}

interface TemplateGalleryProps {
  context: "singleEmail" | "templateTab";
  onSelectTemplate?: (content: string) => void;
  handleEditTemplate?: (templateId: string) => void;
  handleDeleteTemplate?: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  context,
  onSelectTemplate,
  handleEditTemplate,
  handleDeleteTemplate, // New prop for handling delete
}) => {
  const handleClick = () => {
    if (context === "singleEmail" && onSelectTemplate) {
      onSelectTemplate(template.content);
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden border border-gray-200 p-4 h-full flex flex-col ${
        context === "singleEmail" ? "cursor-pointer" : ""
      }`}
      onClick={() =>
        context === "singleEmail" && onSelectTemplate
          ? onSelectTemplate(template.content)
          : undefined
      }
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
        <div
          className="pt-2 overflow-hidden min-h-32 max-h-32"
          dangerouslySetInnerHTML={{ __html: template.content }}
        ></div>
      </div>
      {context === "templateTab" && (
        <div className="mt-4 flex space-x-2">
          <Button size="sm" onClick={() => handleEditTemplate?.(template.templateId)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteTemplate?.(template.templateId)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  context,
  onSelectTemplate,
  handleEditTemplate,
  handleDeleteTemplate,
}) => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/notify/getEmailTemplate/`)
      .then(response => response.json())
      .then(data => {
        setTemplates(data); // Assuming `data` is the array of templates
      })
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  // Calculate the current templates to display
  const indexOfLastTemplate = currentPage * pageSize;
  const indexOfFirstTemplate = indexOfLastTemplate - pageSize;
  const currentTemplates = templates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  // Handle change page
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div
        className={`grid gap-4 ${
          context === "singleEmail" ? "md:grid-cols-2" : "lg:grid-cols-4"
        }`}
      >
        {currentTemplates.map(
          (
            template // Use currentTemplates instead of templates
          ) => (
            <TemplateCard
              key={template.templateId}
              template={template}
              context={context}
              onSelectTemplate={onSelectTemplate}
              handleEditTemplate={
                context === "templateTab" ? handleEditTemplate : undefined
              }
              handleDeleteTemplate={
                context === "templateTab" ? handleDeleteTemplate : undefined
              }
            />
          )
        )}
      </div>
      <div className="mt-8">
        <Pagination
          total={templates.length}
          current={currentPage}
          pageSize={pageSize}
          onChange={onChangePage}
          outline={true}
        />
      </div>
    </>
  );
};

export default TemplateGallery;
