export type Grocery = {
    id: number,
    name: string,
    description: string,
    url: string,
    imageUrl?: string,
    cost: number,
    category?: {
        name: string,
        id: number,
    },
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number
}