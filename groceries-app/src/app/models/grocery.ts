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
    days: Array<string>
}