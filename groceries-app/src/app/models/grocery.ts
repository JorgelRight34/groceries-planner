import { Category } from "./category"

export type Grocery = {
    id: number,
    name: string,
    description: string,
    url: string,
    imageUrl?: string,
    cost: number,
    category?: Category,
    categoryId?: number,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number
}