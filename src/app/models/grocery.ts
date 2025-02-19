export type Grocery = {
    id: number,
    name: string,
    description: string,
    url: string,
    imageUrl: string | undefined,
    cost: number,
    days: Array<string>
}