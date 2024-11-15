"use client"

import { AuthStore, useAuthStore } from "@/app/store/authStore";
import { useEffect } from "react";

export default function AuthGuard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    const fetchUserByToken = useAuthStore((state:AuthStore) => state.fetchUserByToken)
    
    
    
    useEffect(() => {

            
        fetchUserByToken();
            
    }, [])
    
    
    return (
        <>
            
            {children}
                
        </>
    );
  }
  