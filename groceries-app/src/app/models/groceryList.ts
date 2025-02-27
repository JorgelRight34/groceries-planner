import { Grocery } from "./grocery"

export type GroceryList = {
    id: number | undefined,
    name: string,
    description: string,
    groceries: Grocery[]
}