import { Grocery } from "./grocery"
import { User } from "./user"

export interface GroceryList {
    id: number | undefined,
    name: string,
    description: string,
    groceries: Grocery[],
    members?: User[],
    user?: User
}