export type ResortRoomType = {
    recIdentifier: number;
    roomType: string;
    description: string;
    maxOccupancy: number;
    total_inventory: number;
    createdAt: string;
    updatedAt: string;
};

export const resortRoomTypeData = [
    {
        recIdentifier: 29,
        roomType: "Eco-Friendly",
        description: "Environmentally sustainable room with green features",
        maxOccupancy: 2,
        createdAt: "2024-02-11T01:47:57.000Z",
        updatedAt: "2024-02-11T01:47:57.000Z"
    },
    {
        recIdentifier: 1,
        roomType: "Standard",
        description: "Basic room with essential amenities",
        maxOccupancy: 1,
        createdAt: "2024-02-11T01:47:57.000Z",
        updatedAt: "2024-02-11T01:47:57.000Z"
    },
];