
import Link from "next/link"
import { AuthStore, useAuthStore } from "../store/authStore"
import { ButtonHTMLAttributes } from "react"

export type extraLink = {
    url:string | null,
    cont:string,
    action?: void,
}

interface LinksMenuProps{
    extend: boolean
    extraLinks: extraLink[] | null
    hidden:boolean
    auth:boolean
}

export const LinksMenu: React.FC<LinksMenuProps> =({extend,auth, extraLinks, hidden}) => {
    const logout = useAuthStore((state:AuthStore) => state.logout)

    const handleLogout = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        logout();
    }

    return (
        <>
            <Link href="/propiedades" className={`${!hidden? 'py-4 px-5 text-gray-700 font-medium text-base  hover:text-amber-500 transition duration-300':'block py-2 px-4 text-sm text-gray-700 hover:bg-amber-500 hover:text-white'}`}>Propiedades</Link>
            <Link href="/servicios" className={`${!hidden? 'py-4 px-5 text-gray-700 font-medium text-base  hover:text-amber-500 transition duration-300':'block py-2 px-4 text-sm text-gray-700 hover:bg-amber-500 hover:text-white'}`}>Servicios</Link>
            <Link href="/agentes" className={`${!hidden? 'py-4 px-5 text-gray-700 font-medium text-base  hover:text-amber-500 transition duration-300':'block py-2 px-4 text-sm text-gray-700 hover:bg-amber-500 hover:text-white'}`}>Agentes</Link>
            <Link href="/blog" className={`${!hidden? 'py-4 px-5 text-gray-700 font-medium text-base  hover:text-amber-500 transition duration-300':'block py-2 px-4 text-sm text-gray-700 hover:bg-amber-500 hover:text-white'}`}>Blog</Link>
            <Link href="/contacto" className={`${!hidden? 'py-4 px-5 text-gray-700 font-medium text-base  hover:text-amber-500 transition duration-300':'block py-2 px-4 text-sm text-gray-700 hover:bg-amber-500 hover:text-white'}`}>Contacto</Link>
            {
                extend &&
                extraLinks && extraLinks.map((item, index) => (
                    <Link 
                        key={index}
                        href={item.url?.toString() || ''} 
                        className={`${!hidden ? 'py-4 px-5 text-gray-700 font-medium text-base hover:text-amber-500 transition duration-300' : 'block py-2 px-4 text-sm text-gray-700 hover:bg-amber-500 hover:text-white'}`}
                        onClick={(e) => {
                            if (item.action) {
                                e.preventDefault(); 
                                item.action;
                            }
                        }}
                    >
                        {item.cont}
                    </Link>
                ))
            }
            {
                extend && hidden && auth && <button onClick={(e) => {handleLogout(e)}} className="block py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-amber-500 hover:text-white" >Cerrar Sesion</button>
            }
        </>
    )
}