"use client"

import GoogleIcon from "@/app/components/ui/assets/GoogleIcon";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/InputForm";
import VisualPasswordIcon from "@/app/components/ui/VisualPasswordIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AuthStore, useAuthStore} from "@/app/store/authStore"
import {Spinner} from "@nextui-org/spinner";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginWithGoogle = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google/login`
    }

    const loginUser = useAuthStore((state:AuthStore) => state.login)
    const loading = useAuthStore((state:AuthStore) => state.loading)
    const error = useAuthStore((state:AuthStore) => state.error)
    const msg = useAuthStore((state:AuthStore) => state.msg)
    const resetMsg = useAuthStore((state:AuthStore) => state.resetMsg)

    const username = new URLSearchParams(window.location.search).get("user")

    useEffect(() => {
        if (username){
            setEmail(username)
        }
    }, [username])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if(validContent){
            console.log(email,password)
            loginUser(email,password)
        }
    }

    useEffect(() =>{
        setTimeout(()=>{resetMsg()}, 5000)
    }, [msg])

    

    const [validContent, setValidContent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    useEffect(() => {
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordIsValid = password.length >= 8;

        setEmailError(!emailIsValid && email !== '');
        setPasswordError(!passwordIsValid && password !== '');
        setValidContent(emailIsValid && passwordIsValid);
    }, [email, password]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="relative z-10 w-96">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-lg" />
                <div className="relative p-8 rounded-lg">
                    {
                        msg&&<p className="flex justify-center font-medium text-green-400">{msg}</p>
                        
                    }
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>
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
                            text="Iniciar Sesión"
                            accept={validContent}
                            Icon={loading ? Spinner : null}
                        />
                    </form>
                    <p className="text-sm text-gray-600 my-8 flex justify-center">
                    ¿No tenes una cuenta?  
                    <Link href="/auth/register">
                        <strong className="mx-1 text-amber-600">
                        
                        Registrate
                        </strong>
                    </Link>
                    </p>
                    <Button 
                        text="Iniciar sesion con Google"
                        accept={true}
                        Icon={GoogleIcon}
                        onClick={loginWithGoogle}
                    />
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


