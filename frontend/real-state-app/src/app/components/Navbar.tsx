"use client"
import { MapPinHouse , User, Menu, X,ChevronDown  } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from "react"
import { extraLink, LinksMenu } from './Links'
import { AuthStore, useAuthStore } from '../store/authStore'
import AuthGuard from '../(modules)/auth/components/AuthGuard'


export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const notAuthExtraLinks:extraLink[] =[{cont:'Iniciar Sesion', url:'/auth/login'}]
    const isAuthenticated = useAuthStore((state:AuthStore) => state.isAuthenticated)
    const user = useAuthStore((state:AuthStore) => state.user)

    
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)
    const profileMenuRef = useRef<HTMLDivElement>(null)

    

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const logout = useAuthStore((state:AuthStore) => state.logout)

    const handleLogout = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        logout();
    }

    return (
        <AuthGuard>
        <nav  className="bg-white/20 backdrop-blur-lg shadow-md fixed w-full z-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    
                        
                    <Link href="/" className="flex flex-col items-center py-4 px-2">
                        <MapPinHouse className='h-8 w-8 mr-1 text-amber-500' />
                        <span className="font-semibold text-amber-500 text-xs">Real State</span>
                    </Link>
                        
                    <div className="hidden md:flex items-center flex-1 justify-center">
                        <LinksMenu  auth={isAuthenticated} hidden={false} extend={false} extraLinks={null}/>
                    </div>
                    
                    <div className="flex items-center ">
                        {
                            !user?
                                <Link href="/auth/login" className="hidden md:block flex flex-col py-2 px-2 font-medium text-gray-700 rounded-md hover:bg-amber-500 hover:text-white transition duration-300">
                                    <User className="h-6 w-6" />
                                </Link>
                            :
                               
                            <div className="hidden md:block relative" ref={profileMenuRef}>
                                <button
                                    onClick={toggleProfileMenu}
                                    className="flex items-center py-2 px-2 font-medium text-gray-700 rounded-md hover:bg-amber-500 hover:text-white transition duration-300"
                                >
                                    {
                                        user.profilePic?
                                        <img
                                            alt={`profile picture ${user?.name}`}
                                            src={user.profilePic}
                                            className='w-8 h-8 rounded-full mr-2'
                                        />
                                        :
                                        <User className="h-6 w-6" />
                                    }

                                    <p className="text-base">{user.name}</p>
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                        {
                                            user.role && (user.role === 'ADMIN' || user.role === 'COLLABORATOR') &&
                                            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500 hover:text-white">
                                              Panel de administrador
                                            </Link>
                                        }
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500 hover:text-white">
                                            Mi Perfil
                                        </Link>
                                        <button onClick={(e) => {handleLogout(e)}} className="block font-semibold w-full px-4 py-2 text-sm text-gray-700 hover:bg-amber-500 hover:text-white">
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                                
                        }

                        <div className="md:hidden">
                            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                                {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white/20 backdrop-blur-lg`}>
                <LinksMenu
                    auth={isAuthenticated}
                    hidden={true}
                    extend={true}
                    extraLinks={
                        isAuthenticated ? 
                        null
                        :
                        notAuthExtraLinks
                    }
                />
            </div>
        </nav>
        </AuthGuard>
    )

}

