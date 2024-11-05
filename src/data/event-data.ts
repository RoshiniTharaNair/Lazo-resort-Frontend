// src/data/event-data.ts

export type EventType = {
  id: number;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  transactionReference: string;
  paymentMode: string;
  base: number;
  gst: number;
  primaryContact: string;
  primaryEmail: string;
  specialRequest: string;
};

export const eventData: EventType[] = [
  {
    id: 62447,
    title: 'ICT Expo 2021 - Product ReleaseFrancis Sanford MD',
    description:
      'The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today its seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Learn more at www.ictexpo.com',
    location: '1250 E Apache Blvd, Arkansas, USA',
    start: '2023-10-18T13:24:00.760Z',
    end: '2023-10-18T13:24:00.760Z',
    transactionReference: 'TRX123456789',
    paymentMode: 'Credit Card',
    base: 500,
    gst: 50,
    primaryContact: 'John Doe',
    primaryEmail: 'john.doe@example.com',
    specialRequest: 'Vegetarian meal',
  },
  {
    id: 54648,
    title: 'Product ReleaseFrancis Sanford MD',
    description:
      'The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today its seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Learn more at www.ictexpo.com',
    location: '1250 E Apache Blvd, Arkansas, USA',
    start: '2023-10-18T13:24:00.760Z',
    end: '2023-10-18T13:24:00.760Z',
    transactionReference: 'TRX987654321',
    paymentMode: 'PayPal',
    base: 300,
    gst: 30,
    primaryContact: 'Jane Smith',
    primaryEmail: 'jane.smith@example.com',
    specialRequest: 'Wheelchair access',
  },
  {
    id: 63521,
    title: 'Francis Sanford MD',
    description:
      'The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today its seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Learn more at www.ictexpo.com',
    location: '1250 E Apache Blvd, Arkansas, USA',
    start: '2023-10-18T13:24:00.760Z',
    end: '2023-10-18T13:24:00.760Z',
    transactionReference: 'TRX456789123',
    paymentMode: 'Cash',
    base: 200,
    gst: 20,
    primaryContact: 'Alice Johnson',
    primaryEmail: 'alice.johnson@example.com',
    specialRequest: 'High chair for infant',
  },
];
