"use client"

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/InputForm";
import VisualPasswordIcon from "@/app/components/ui/VisualPasswordIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AuthStore, useAuthStore} from "@/app/store/authStore"
import {Spinner} from "@nextui-org/spinner";
import { useRouter } from "next/navigation";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const router = useRouter();
    const registerUser = useAuthStore((state:AuthStore) => state.registerUser)
    const loading = useAuthStore((state:AuthStore) => state.loading)
    const error = useAuthStore((state:AuthStore) => state.error)
    const msg = useAuthStore((state:AuthStore) => state.msg)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if(validContent){

            let result = await registerUser(email,name,lastname,phoneNumber,password)
            console.log(msg)
            if (result){
                
                router.push(`/auth/login?user=${email}`)

                
            }
        }
    }

    

    const [validContent, setValidContent] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    //const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    
    //const [profilePic, setProfilePic] = useState<File|null>(null)

    

    useEffect(() => {
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordIsValid = password.length >= 8;
        const nameIsValid = name !== ''
        const lastnameIsValid = lastname !== ''
        const phoneNumberIsValid = phoneNumber !== ''

        setEmailError(!emailIsValid && email !== '');
        setPasswordError(!passwordIsValid && password !== '');
        setValidContent(emailIsValid && passwordIsValid && nameIsValid && lastnameIsValid && phoneNumberIsValid);
    }, [email,password,name,lastname,phoneNumber]);

    /*const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfilePic(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicture(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }*/

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="relative z-10 w-96">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-lg" />
                <div className="relative p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrarse</h2>
                    <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                        <Input
                            label="Correo electronico"
                            id="email"
                            placeholder="ejemplo@gmail.com"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="h-2 flex my-0 items-center">

                            {emailError && (
                                <p className="m-0 text-red-500 text-xs">Por favor ingresa un correo válido</p>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:mr-2 mt-2">

                                <Input
                                    label="Nombre"
                                    id="name"
                                    placeholder="Juan"
                                    name="email"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 md:ml-2 ">

                                <Input
                                    label="Apellido"
                                    id="lastname"
                                    placeholder="Perez"
                                    name="lastname"
                                    type="text"
                                    required
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        
                            <div className="mt-2">
                                <Input
                                    label="Nro. de celular"
                                    id="phoneNumber"
                                    placeholder="3625000000"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            {/*<div className="md:mr-2 mt-2">
                                <input 

                                />
                            </div>*/}
                            {/*
                               
                            <div className="mt-2 flex items-center">
                                {
                                    profilePicture ? (
                                        <Image
                                        src={profilePicture}
                                        alt="Vista previa"
                                        width={40}
                                        height={40}
                                        className="object-cover rounded-full h-14 w-14"
                                        />
                                    ) : (
                                        <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        </span>
                                    )
                                }
                                <label
                                    htmlFor="file-upload"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                >
                                    <span>Subir foto</span>
                                    <input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    />
                                </label>
                                
                            </div>

                         
                            */}
                        <Input
                            label="Contraseña"
                            value={password}
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            additionalElement={VisualPasswordIcon}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                        <div className="h-2 flex my-0 items-center">
                            {passwordError && (
                                <p className="m-0 text-red-500 text-xs">La contraseña debe tener al menos 8 caracteres</p>
                            )}
                        </div>
                        
                        <Button
                            text="Crear cuenta"
                            accept={validContent}
                            Icon={loading ? Spinner : null}
                        />
                    </form>
                    {
                        msg?
                        <p className="text-sm text-green-500 my-8 flex justify-center">
                        Cuenta creada,  
                        <Link href="/auth/login">
                            <strong className="mx-1 text-green-600">
                            
                            Iniciar sesion
                            </strong>
                        </Link>
                        </p>
                        :
                        <p className="text-sm text-gray-600 my-8 flex justify-center">
                    
                    
                        ¿Ya tenes una cuenta?  
                        <Link href="/auth/login">
                            <strong className="mx-1 text-amber-600">
                            
                            Iniciar Sesion
                            </strong>
                        </Link>
                    </p>
                    }
                    
                    
                    <div className="h-2 flex my-4 justify-center items-center">
                        {error && (
                            <p className="m-0 text-red-500 text-xs">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}


