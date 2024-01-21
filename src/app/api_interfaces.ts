export interface Role{
    _id: string;
    role: string;
}

export interface User{
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    roles: Role[];
}

export interface Food{
    _id: string;
    name: string;
    price: number;
}

export interface Drink{
    _id: string;
    name: string;
    price: number;
}

export interface Table{
    _id: string;
    name: string;
    n_seats: number;
    occupied: boolean;
}

export interface FoodItem {
    food: string; // same as _id
    name: string;
    quantity: number;
}

export interface DrinkItem {
    drink: string; // same as _id
    name: string;
    quantity: number;
}

export interface FoodOrder {
    _id: string;
    cod: string;
    table: Table;
    ready: boolean;
    foods: FoodItem[];
    date: Date;
}

export interface DrinkOrder {
    _id: string;
    cod: string;
    table: Table;
    ready: boolean;
    drinks: DrinkItem[];
    date: Date;
}