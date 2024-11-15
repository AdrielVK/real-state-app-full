import {create} from "zustand"
import { ResponseLogin, User } from "../interfaces/auth";
import axios from 'axios';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  msg: string | null;
  isAuthenticated: boolean;
}

export type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserByToken: () => Promise<void>;
  registerUser: (email:string,name:string, lastname:string,phoneNumber:string,password:string) => Promise<boolean>
  resetMsg: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const InitialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  msg: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...InitialState, 

  resetMsg: () => {
    set({msg:null})
  },

  registerUser: async(email:string,name:string, lastname:string,phoneNumber:string,password:string) =>{
    set({ loading: true, error: null });
    try{
    
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`, 
        { email,
          name,
          lastname,
          phoneNumber,
          password,
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.status === 201){
        
        set({  loading: false, error: null, msg:response.data.payload.message });
        return true
      } else {
        set({  loading: false, error: 'Error register' }); 
        return false       
      }
      
    } catch(error:any){
      set({  loading: false, error: error.response.data.message.message||'Error register' });
      return false
    }
  },

  login: async (email:string, password:string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      
      const data:ResponseLogin = response.data.payload;

      localStorage.setItem('accessToken', data.access_token)

      console.log(data);
      set({  loading: false, isAuthenticated: true, error: null });
    } catch (error: any) {
      set({ loading: false, error: error.response.data.message || 'Error' });
      console.log(error);
    }
  },

  fetchUserByToken: async ()=>{
    console.log('fetchuser')
    try {
      
      let accessToken = localStorage.getItem('accessToken')
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/me`,{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(response.status === 200){
        
        set({isAuthenticated:true, user: response.data, error:null, loading:false})
      } 

    } catch(error: any){
      set({isAuthenticated:false, user: null, error:null, loading:false})
      console.log(error)
    }
  },

  logout: async () => {
    try {
      set({loading:true})

      let accessToken = localStorage.getItem('accessToken')

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`,{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })

      localStorage.removeItem('accessToken')
      console.log('logout')
      console.log(response)
      set({isAuthenticated:false, user: null, error:null, loading:false})

    } catch(error:any){
      console.log(error)
      localStorage.removeItem('accessToken')
      set({isAuthenticated:false, user: null, error:null, loading:false})
    }
  }
}));

