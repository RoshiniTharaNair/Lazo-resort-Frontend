export type InventoryeType = {
    inventoryIdentifier: number;  // Assuming 'id' is synonymous with 'inventoryIdentifier'
    resortIdentifier: number;
    effectiveDate: string;  // Dates will be formatted as strings in TypeScript for JSON serialization/deserialization.
    roomClass: string;
    avlCount: number;
    minOcc: number;
    basePrice: number;
    gst: string;
    discount?: string;  // Optional as per your Sequelize model.
    createdAt: string;
    updatedAt: string;
};
  
export const InventoryData = [
    {
      "inventoryIdentifier": 1,
      "resortIdentifier": 10,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Standard",
      "avlCount": 15,
      "minOcc": 1,
      "basePrice": 100.00,
      "gst": "12%",
      "discount": "10%",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 2,
      "resortIdentifier": 20,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Deluxe",
      "avlCount": 10,
      "minOcc": 2,
      "basePrice": 150.00,
      "gst": "12%",
      "discount": "15%",
      "createdAt": "2024-01-02T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 3,
      "resortIdentifier": 30,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Suite",
      "avlCount": 5,
      "minOcc": 2,
      "basePrice": 200.00,
      "gst": "15%",
      "discount": "5%",
      "createdAt": "2024-01-03T00:00:00.000Z",
      "updatedAt": "2024-01-03T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 4,
      "resortIdentifier": 40,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Executive",
      "avlCount": 8,
      "minOcc": 1,
      "basePrice": 180.00,
      "gst": "10%",
      "discount": "20%",
      "createdAt": "2024-01-04T00:00:00.000Z",
      "updatedAt": "2024-01-04T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 5,
      "resortIdentifier": 50,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Family Suite",
      "avlCount": 12,
      "minOcc": 3,
      "basePrice": 250.00,
      "gst": "18%",
      "createdAt": "2024-01-05T00:00:00.000Z",
      "updatedAt": "2024-01-05T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 6,
      "resortIdentifier": 60,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Penthouse",
      "avlCount": 2,
      "minOcc": 2,
      "basePrice": 300.00,
      "gst": "18%",
      "discount": "25%",
      "createdAt": "2024-01-06T00:00:00.000Z",
      "updatedAt": "2024-01-06T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 7,
      "resortIdentifier": 70,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Junior Suite",
      "avlCount": 14,
      "minOcc": 1,
      "basePrice": 160.00,
      "gst": "5%",
      "createdAt": "2024-01-07T00:00:00.000Z",
      "updatedAt": "2024-01-07T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 8,
      "resortIdentifier": 80,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Twin",
      "avlCount": 20,
      "minOcc": 1,
      "basePrice": 120.00,
      "gst": "12%",
      "discount": "10%",
      "createdAt": "2024-01-08T00:00:00.000Z",
      "updatedAt": "2024-01-08T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 9,
      "resortIdentifier": 90,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "Double",
      "avlCount": 18,
      "minOcc": 2,
      "basePrice": 130.00,
      "gst": "15%",
      "discount": "8%",
      "createdAt": "2024-01-09T00:00:00.000Z",
      "updatedAt": "2024-01-09T00:00:00.000Z"
    },
    {
      "inventoryIdentifier": 10,
      "resortIdentifier": 100,
      "effectiveDate": "2024-04-30T00:00:00.000Z",
      "roomClass": "King",
      "avlCount": 10,
      "minOcc": 2,
      "basePrice": 220.00,
      "gst": "20%",
      "createdAt": "2024-01-10T00:00:00.000Z",
      "updatedAt": "2024-01-10T00:00:00.000Z"
    }
  ];
  