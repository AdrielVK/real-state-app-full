"use client"

import Button from "@/app/components/ui/Button";
import { AuthStore, useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import React from "react";

interface HDProps {

}

export const HeaderDashboard: React.FC<HDProps> = ({}) =>{

    const router = useRouter();
    const role:string|undefined = useAuthStore((state:AuthStore) => state.user?.role)
    const redirect = async (e:React.MouseEvent<HTMLButtonElement>, route:string) => {
        router.push(route);
    }

    return(
        <header className="mt-20 flex justify-between items-center w-full p-4">
            <h1 className="font-medium">Panel de administracion</h1>
            {
                role&&<span className="font-semibold text-xs border-solid border-2 text-amber-500 border-amber-500 rounded-md p-2">{role}</span>
            }
            <span>
                <Button text="Crear propiedad" onClick={(e) => redirect(e, '/dashboard/create/property')} accept/>
            </span>
      </header>
    )
}