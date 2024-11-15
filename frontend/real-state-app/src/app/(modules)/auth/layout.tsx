"use client"

import FormAuthSkeleton from "@/app/components/ui/Skeletons/Auth/FormAuthSkeleton";
import { AuthStore, useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const fetchUserByToken = useAuthStore((state:AuthStore) => state.fetchUserByToken)
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useAuthStore((state:AuthStore) => state.isAuthenticated)
    
    const router = useRouter();    
    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token")
        if(token) {
            localStorage.setItem("accessToken", token)
        }

        const checkUser = async () => {
            
            await fetchUserByToken();
           
            setLoading(false); 
        };

        checkUser();
        
        
    }, [])
    
    useEffect(() => {
        if (isAuthenticated) {
          router.push('/');
        }
    }, [isAuthenticated]);

    return (
        <>
            {
                loading ?
                <div className="w-full h-full flex justify-center align-center">
                    <FormAuthSkeleton/>

                </div> 
                :
                <>
                    {children}
                </>
            }
        </>
    );
  }
  