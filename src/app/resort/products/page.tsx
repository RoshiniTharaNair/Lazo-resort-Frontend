"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ProductsTable from "@/app/shared/resort/product/product-list/table";
import { productsData } from "@/data/products-data";
import { metaObject } from "@/config/site.config";
import ExportButton from "@/app/shared/export-button";
import { RoomCategoryForm } from "@/app/shared/resort/product/create-edit/roomcategory-form";
import { CreateProductInput } from "@/utils/validators/create-product.schema";
import { useForm, FormProvider } from "react-hook-form";

const metadata: Metadata = {
  title: "Room Categories | Lazo Resort Admin",
};

const pageHeader = {
  title: "Room Categories",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.roomCategories,
      name: "Room Categories",
    },
    {
      name: "List",
    },
  ],
};

export default function ProductsPage() {
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<
    CreateProductInput | undefined
  >(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const methods = useForm({
    // defaultValues: defaultValues(),
  });

  const toggleDrawer = (category?: CreateProductInput) => {
    setSelectedRoomCategory(category);
    setIsEditMode(!!category);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductsTable data={productsData} onEditToggle={toggleDrawer} />
    </>
  );
}
