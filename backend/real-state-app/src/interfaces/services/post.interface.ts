import { UserResponseInterface } from "./user.interface"

export interface FeatureResponseInterface{
    id?: number,
    name: string,
}


export interface FeatureOfPropertyResponseInterface {
    id: number,
    quantity: string,
    feature: FeatureResponseInterface

}

export interface TypeResponseInterface{
    id: number,
    name: string
}

export interface PropertyResponseInterface {
    id: number,
    province:string,
    city: string,
    street:string,
    streetId?: string,
    addId?:string,
    state:string,
    user: UserResponseInterface
    type: TypeResponseInterface
    features:FeatureOfPropertyResponseInterface[]
}

interface Prices {
    id?:number,
    type:string,
    amount:number,
    add_amount?:number
}

export interface PublicationResponseInterface{
    property: PropertyResponseInterface
    title: string,
    description:string,
    images: {id?:number, url:string}[],
    videos: {id?:number, url:string}[]
    operation: string,
    prices:Prices[]
}

export interface GetPropertyResponseInterface {
    data: PropertyResponseInterface
}

export interface features {
    name:string,
    id?:number,
    unit?:string
}

