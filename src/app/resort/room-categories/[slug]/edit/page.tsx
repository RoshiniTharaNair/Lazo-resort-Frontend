'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/resort/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProductData = {
  id: number;
  roomCategoryIdentifier: number;
  type: string;
  description: string;
  minOccupancy: number;
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Room Types | Lazo Resort Admin",
};
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const slug = params.slug;
//   return metaObject(`Edit ${slug}`);
// }

const pageHeader = {
  title: 'Edit Room',
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: 'Lazo resort admin',
    },
    {
      href: routes.resort.createRoom,
      name: 'Rooms',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/room-categories/update/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          toast.success(`Room ${params.slug} got updated successfully`);
        } else {
          console.error('Failed to fetch product data');
          toast.error(`Failed to update room ${params.slug}`);
        }
      } catch (error) {
        console.error('Failed to fetch product data', error);
        toast.error(`Failed to delete room ${params.slug}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createRoom}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Room
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditProduct slug={params.slug}  product={product ?? undefined} />
      )}
    </>
  );
}