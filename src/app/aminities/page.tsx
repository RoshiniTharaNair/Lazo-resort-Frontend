'use client'

import React, { useEffect, useState } from 'react';
import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
import FormGroup from '@/app/shared/form-group';
import { Button, Input } from 'rizzui';
import { getAminitiesColumns as getAminitiesColumns } from '@/app/shared/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import TableLayout from '@/app/shared/tables/table-layout';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

 const metadata: Metadata = {
  title: 'Add Amenity | Isomorphic Furyroad',
};

const pageHeader = {
  title: 'Add Amenity',
  tableTitle: 'Amenities Table',
  breadcrumb: [
    { href: '/', name: 'Home' },
    { name: 'Add Amenity' },
  ],
  tableBreadcrumb: [
    { href: '/', name: 'Amenity' },
    { name: 'Get Amenities Table' },
  ],
};

export default function NewPage() {
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [amenity, setAmenity] = useState({
    amenityIdentifier: '',
    category: '',
    label: '',
    shortDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmenity({ ...amenity, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/amenities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(amenity)
      });

      if (response.ok) {
        console.log('Amenity added successfully');
        // Handle successful response
      } else {
        console.error('Failed to add amenity');
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error in submission
    }
  };
  useEffect(() => {
    const fetchAmenities = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/amenities`);
      const data = await response.json();
      setAmenities(data);
      setIsLoading(false);
    };
    fetchAmenities();
  }, []);
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <form onSubmit={handleSubmit} className="form-class"> {/* Update className as per your CSS */}
        <FormGroup title="Amenity Details">
          <Input
            id="amenityIdentifier"
            name="amenityIdentifier"
            value={amenity.amenityIdentifier}
            onChange={handleChange}
            placeholder="Amenity Identifier"
          />
          <Input
            id="category"
            name="category"
            value={amenity.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <Input
            id="label"
            name="label"
            value={amenity.label}
            onChange={handleChange}
            placeholder="Label"
          />
          <Input
            id="shortDescription"
            name="shortDescription"
            value={amenity.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
          />
        </FormGroup>
        <br></br>
        <Button type="submit">Submit</Button>
      </form>
      <br></br>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
      <TableLayout
      title={pageHeader.tableTitle}
      breadcrumb={pageHeader.tableBreadcrumb}
      data={amenities}
      fileName="aminities_data"
      header="Ameneties ID,Category,Label,Short Description"
    >
      <div className="grid grid-cols-1 gap-6 3xl:gap-8">
        <BasicTableWidget
          variant="classic"
          title="Classic Table"
          data={amenities}
          // @ts-ignore
          getColumns={getAminitiesColumns}
          enableSearch={true}
        />
      </div>
    </TableLayout>
    )}
    </>
  );
}
