export type ResortType = {
    rst_id: string;
    rst_lbl: string;
    geo_id: string;
    doc_id: string;
    reservation_cont: string;
    services_cont: string;
    support_cont: string;
    reservation_email: string;
    services_email: string;
    support_email: string;
    rst_desc: string;
  };
  
  export const ResortData: ResortType[] = [
    {
      rst_id: "RST001",
      rst_lbl: "Seaside Retreat",
      geo_id: "GEO001",
      doc_id: "DOC001",
      reservation_cont: "911234567890",
      services_cont: "911234567891",
      support_cont: "911234567892",
      reservation_email: "reserve@seasideret.com",
      services_email: "services@seasideret.com",
      support_email: "support@seasideret.com",
      rst_desc: "A luxurious beachfront resort."
    },
    {
      rst_id: "RST002",
      rst_lbl: "Mountain Escape",
      geo_id: "GEO002",
      doc_id: "DOC002",
      reservation_cont: "912345678901",
      services_cont: "912345678902",
      support_cont: "912345678903",
      reservation_email: "reserve@mountesc.com",
      services_email: "services@mountesc.com",
      support_email: "support@mountesc.com",
      rst_desc: "Nestled in the high mountains."
    },
    {
      rst_id: "RST003",
      rst_lbl: "Urban Getaway",
      geo_id: "GEO003",
      doc_id: "DOC003",
      reservation_cont: "913456789012",
      services_cont: "913456789013",
      support_cont: "913456789014",
      reservation_email: "reserve@urbget.com",
      services_email: "services@urbget.com",
      support_email: "support@urbget.com",
      rst_desc: "Perfect for city escapes."
    },
    {
      rst_id: "RST010",
      rst_lbl: "Coastal Sands",
      geo_id: "GEO010",
      doc_id: "DOC010",
      reservation_cont: "910123456789",
      services_cont: "910123456780",
      support_cont: "910123456781",
      reservation_email: "reserve@coastsand.com",
      services_email: "services@coastsand.com",
      support_email: "support@coastsand.com",
      rst_desc: "Sandy beaches await."
    }
  ];
  
  