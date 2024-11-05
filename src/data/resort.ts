export type DocumentType = {
  docId: string;
  doc_type: string;
  doc_url: string;
  doc_effdate: string;
  poc_name: string;
  poc_cont: string;
  poc_email: string;
};

export type SpocType = {
  spocId: number;
  emp_code: string;
  spoc_role: string;
  status: string;
};

export type TagType = {
  tagId: number;
  tagLabel: string;
  tagClass: string;
  tagDesc: string;
  status: string;
};

export type ResortType = {
  resortIdentifier: string;
  label: string;
  geoLocationIdentifier: string;
  docId: string;
  reservation_cont: string;
  services_cont: string;
  support_cont: string;
  reservation_email: string;
  services_email: string;
  careers_email: string;
  support_email: string;
  description: string;
  Document: DocumentType;
  SPOC: SpocType;
  Tags: TagType;
};

export const ResortData: ResortType[] = [
  {
    resortIdentifier: "RST001",
    label: "Seaside Retreat",
    geoLocationIdentifier: "GEO001",
    docId: "DOC001",
    reservation_cont: "911234567890",
    services_cont: "911234567891",
    support_cont: "911234567892",
    reservation_email: "reserve@seasideret.com",
    services_email: "services@seasideret.com",
    support_email: "support@seasideret.com",
    careers_email: "careers@seasideret.com",
    description: "A luxurious beachfront resort.",
    Document: {
      docId: "DOC001",
      doc_type: "PDF",
      doc_url: "https://docs.seasideret.com/001",
      doc_effdate: "2023-04-01",
      poc_name: "John Doe",
      poc_cont: "911234567890",
      poc_email: "jdoe@seasideret.com",
    },
    SPOC: {
      spocId: 1,
      emp_code: "EMP001",
      spoc_role: "Manager",
      status: "Active",
    },
    Tags: {
      tagId: 1,
      tagLabel: "Beachfront",
      tagClass: "Location",
      tagDesc: "Direct beach access",
      status: "Active",
    },
  },
  {
    resortIdentifier: "RST004",
    label: "Forest Lodge",
    geoLocationIdentifier: "GEO004",
    docId: "DOC004",
    reservation_cont: "914567890123",
    services_cont: "914567890124",
    support_cont: "914567890125",
    reservation_email: "reserve@forestlod.com",
    services_email: "services@forestlod.com",
    support_email: "support@forestlod.com",
    careers_email: "careers@seasideret.com",
    description: "Deep in the tranquil woods.",
    Document: {
      docId: "DOC004",
      doc_type: "DOCX",
      doc_url: "https://docs.forestlod.com/004",
      doc_effdate: "2023-04-04",
      poc_name: "Bob Brown",
      poc_cont: "914567890123",
      poc_email: "bbrown@forestlod.com",
    },
    SPOC: {
      spocId: 4,
      emp_code: "EMP004",
      spoc_role: "Security",
      status: "Inactive",
    },
    Tags: {
      tagId: 4,
      tagLabel: "Forest",
      tagClass: "Environment",
      tagDesc: "Surrounded by woods",
      status: "Active",
    },
  },
  {
    resortIdentifier: "RST005",
    label: "Lakeside Cabins",
    geoLocationIdentifier: "GEO005",
    docId: "DOC005",
    reservation_cont: "915678901234",
    services_cont: "915678901235",
    support_cont: "915678901236",
    reservation_email: "reserve@lakecab.com",
    services_email: "services@lakecab.com",
    careers_email: "careers@lakecab.com",
    support_email: "support@lakecab.com",
    description: "Serene lake views.",
    Document: {
      docId: "DOC005",
      doc_type: "PDF",
      doc_url: "https://docs.lakecab.com/005",
      doc_effdate: "2023-04-05",
      poc_name: "Carol White",
      poc_cont: "915678901234",
      poc_email: "cwhite@lakecab.com",
    },
    SPOC: {
      spocId: 5,
      emp_code: "EMP005",
      spoc_role: "Catering",
      status: "Active",
    },
    Tags: {
      tagId: 5,
      tagLabel: "Lakeside",
      tagClass: "Location",
      tagDesc: "Lake views available",
      status: "Active",
    },
  },
];
