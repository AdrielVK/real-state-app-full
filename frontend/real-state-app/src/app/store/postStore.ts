import {create} from "zustand"
import axios from 'axios';

export interface featureProperty {
    id?:number
    name:string
    unit:string|null
}

export interface PostState {
    features_list_create:featureProperty[]

    error:string|null
    msg:string|null
    loading:boolean
}


export type PostActions = {
    getFeaturesList: () => Promise<void>;
}

export type PostStore = PostActions & PostState

export const InitialState: PostState = {
    features_list_create:[],
    error:null,
    msg:null,
    loading:false
}

export const usePostStore = create<PostStore>((set) => ({
    ...InitialState,

    getFeaturesList: async() => {
        try{

            set({loading:true})
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}post/features`)
            if (response.status ===200){

                set({loading:false, features_list_create:response.data.payload})
            } else{
                set({loading:false, error:'Error al obtener las caracteristicas'})    
            }
        } catch(error:any){
            set({loading:false, error:'Error al obtener las caracteristicas'})
        }
    },
}));