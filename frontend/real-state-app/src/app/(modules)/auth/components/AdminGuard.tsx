"use client"

import { AuthStore, useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const user = useAuthStore((state:AuthStore) => state.user)
    const router = useRouter();
    
    
    useEffect(() => {
        
        if (user && (user.role === 'DEFAULT')) {
          router.push('/');
        }
    }, [user]);

    return (
        <>
            
            {children}
                   
        </>
    );
  }
  