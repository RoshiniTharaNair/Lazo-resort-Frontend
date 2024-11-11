"use client";

import { useState, useEffect, useCallback } from 'react';
import { Tab, Loader } from 'rizzui';
import ResortTable from "@/app/shared/resort/resort/product-list/table";
import DocumentTable from "@/app/shared/resort/resort/product-list/documentTable";
import TagsTable from "@/app/shared/resort/resort/product-list/tagTable";
import SpocTable from "@/app/shared/resort/resort/product-list/spocTable";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface TabsViewProps {
  toggleDrawer: (item: any) => void;
}

export default function TabsView({ toggleDrawer }: TabsViewProps) {
  const [data, setData] = useState({
    resorts: [],
    documents: [],
    spocs: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [resorts, documents, spocs, tags] = await Promise.all([
        fetch(`${apiUrl}/resorts/view`).then(res => res.json()),
        fetch(`${apiUrl}/ResortDoc/view`).then(res => res.json()),
        fetch(`${apiUrl}/ResortSpoc/view`).then(res => res.json()),
        fetch(`${apiUrl}/ResortTag/view`).then(res => res.json()),
      ]);
      setData({ resorts, documents, spocs, tags });
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditToggle = (item: any) => {
    console.log('Edit toggle:', item);
    toggleDrawer(item);
  };

  return (
    <Tab>
      <Tab.List>
        <Tab.ListItem>Resorts</Tab.ListItem>
        <Tab.ListItem>Documents</Tab.ListItem>
        <Tab.ListItem>SPOCs</Tab.ListItem>
        <Tab.ListItem>Tags</Tab.ListItem>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {isLoading ? <Loader /> : <ResortTable data={data.resorts} onEditToggle={handleEditToggle} />}
        </Tab.Panel>
        <Tab.Panel>
          {isLoading ? <Loader /> : <DocumentTable data={data.documents} onEditToggle={handleEditToggle} />}
        </Tab.Panel>
        <Tab.Panel>
          {isLoading ? <Loader /> : <SpocTable data={data.spocs} onEditToggle={handleEditToggle}/>}
        </Tab.Panel>
        <Tab.Panel>
          {isLoading ? <Loader /> : <TagsTable data={data.tags} onEditToggle={handleEditToggle}/>}
        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
}