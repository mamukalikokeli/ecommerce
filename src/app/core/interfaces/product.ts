export interface Product{
    id: string,
    name: string,
    price: number,
    discount: number,
    inStock: boolean,
    images: string[],
    colors: string[],
    sizes: string[],
   

    reviews: {
        strars: number,
        count: number,
    },
    categoryId: string
}