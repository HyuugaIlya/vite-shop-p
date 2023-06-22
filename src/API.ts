import axios from "axios";

const instance = axios.create({
    baseURL: 'https://644bbe3217e2663b9df71c99.mockapi.io/api/v1/'
});


//Pizzas
export enum SortProperty {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE = 'title'
}
export type TSort = {
    id: number
    title: string
    sortProperty: SortProperty
}
export type TPizzas = {
    id: string
    imageUrl: string
    price: number[]
    title: string
    category: number
    rating: number
    sizes: number[]
    types: number[]
}
export type TGetPizzas = {
    searchValue: string
    currentPage: number
    pageLimit: number
    categoryId: number
    sortType: TSort
}
export const pizzasAPI = {
    getPizzas({ searchValue = '', currentPage = 1, pageLimit = 8, categoryId = 0, sortType }: TGetPizzas) {
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const search = searchValue ? `&search=${searchValue}` : '';

        return instance.get<TPizzas[]>(`pizzas?p=${currentPage}&l=${pageLimit}${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.data);
    }
};

//Drinks
export type TDrinks = {
    id: string
    imageUrl: string
    title: string
    types: number[]
    price: number[]
    rating: number
}
export type TGetDrinks = {
    currentPage: number
    pageLimit: number
    searchValue: string
}
export const drinksAPI = {
    getDrinks({ currentPage = 1, pageLimit = 8, searchValue = '' }: TGetDrinks) {
        const search = searchValue ? `&search=${searchValue}` : '';

        return instance.get<TDrinks[]>(`drinks?p=${currentPage}&l=${pageLimit}${search}`)
            .then(res => res.data);
    }
}

//Popular
export type TPopPizza = {
    id: string
    imageUrl: string
    title: string
    sizes: number[]
    types: number[]
    price: number[]
    rating: number
}
export type TPopDrink = {
    id: string
    imageUrl: string
    title: string
    types: number[]
    price: number[]
    rating: number
}
export const popularAPI = {
    getPopDrinks() {
        return instance.get<TPopDrink[]>(`drinks?p=1&l=6&sortBy=rating&order=desc`)
            .then(res => res.data);
    },
    getPopPizzas() {
        return instance.get<TPopPizza[]>(`pizzas?p=1&l=6&sortBy=rating&order=desc`)
            .then(res => res.data);
    }
}