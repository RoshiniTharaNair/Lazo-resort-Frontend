export type VoidDateType = {
    voiddateIdentifier: number;
    resortIdentifier: number;
    voidDate: string;
    voidMultiplier: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export const voidDateData: VoidDateType[] = [
    {
      voiddateIdentifier: 1,
      resortIdentifier: 4,
      voidDate: "2024-06-21T00:00:00.000Z",
      voidMultiplier: 2,
      createdAt: "2024-06-21T10:58:42.000Z",
      updatedAt: "2024-06-21T10:58:42.000Z",
    },
    {
      voiddateIdentifier: 2,
      resortIdentifier: 4,
      voidDate: "2024-06-29T00:00:00.000Z",
      voidMultiplier: 2,
      createdAt: "2024-06-25T11:21:54.000Z",
      updatedAt: "2024-06-25T11:21:54.000Z",
    },
    {
      voiddateIdentifier: 3,
      resortIdentifier: 2,
      voidDate: "2024-06-21T00:00:00.000Z",
      voidMultiplier: 2,
      createdAt: "2024-08-24T02:46:21.000Z",
      updatedAt: "2024-08-24T02:46:21.000Z",
    },
    {
      voiddateIdentifier: 4,
      resortIdentifier: 5,
      voidDate: "2024-06-21T00:00:00.000Z",
      voidMultiplier: 2,
      createdAt: "2024-08-24T02:46:27.000Z",
      updatedAt: "2024-08-24T02:46:27.000Z",
    },
  ];
  