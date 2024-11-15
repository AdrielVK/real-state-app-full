"use client"

import Button from "@/app/components/ui/Button";
import { PostState, PostStore, usePostStore } from "@/app/store/postStore";
import { useEffect, useState } from "react";



interface featureReq {
    quantity?:string
    featureName:string
}

export default function Form() {    

    const [ftName, setFtName] = useState<string>('')
    const [ftQuantity, setQuantity] = useState<string >('')

    const getFeaturesList = usePostStore((state:PostStore) =>  state.getFeaturesList)
    let ftList = usePostStore((state:PostState) => state.features_list_create)
    
    const [features, setFeatures] = useState<featureReq[]>([]);

    useEffect(()=>{
        console.log('features')
        console.log(features)
    },[features])

    useEffect(()=>{
        getFeaturesList()
    },[])

    const addFeature = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const newFt: featureReq = {
            featureName: ftName,
        };

        console.log(newFt)

        if(ftQuantity !== ''){
            newFt.quantity = ftQuantity
        }
        
        
        setFeatures((prevFeatures) => {
            const updatedFeatures = [...prevFeatures, newFt];
            console.log("Updated features array:", updatedFeatures); // Revisar cambios en el estado
            return updatedFeatures;
        }); 
        setFtName(''); // Resetear los campos del formulario
        setQuantity('');
        console.log(features)
    };


    return (
        <div>
            <div className="w-full p-4 flex flex-col md:flex-row justify-center">

            
                <form className="text-sm w-full md:w-1/2 flex flex-col  p-8" onSubmit={addFeature}>
                    <h3 className="text-base font-semibold text-center">Agrega las caracteristicas de la propiedad</h3>
                    

                    <select value={ftName} onChange={(e) => setFtName(e.target.value)} name="option" required className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                        <option>Seleccione...</option>
                        
                        {   
                            ftList && ftList.map((option, index) => (
                                <option className="text-xs text-gray-900" key={index} value={option.name}>
                                    
                                    {option.name}
                                    
                                        
                                </option>
                                
                            ))
                        }
                    </select>

                    <input
                        value={ftQuantity}
                        onChange={(e) => {setQuantity(e.target.value)}} 
                        name="quantity"
                        type="text"
                        placeholder="Ingrese una cantidad para la caracteristica "
                        className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    <div className="w-full flex justify-center">

                        <span className="w-1/3">

                            <Button type="submit" text="Agregar" accept/>
                        </span>
                    </div>
                    
                </form>
                <div className="p-8 w-full md:w-1/2 flex flex-col justify-center content-center ">
                    
                    {
                        features&&features.map((ft, index) => (
                            <span key={index} className="flex">
                                {
                                    ft.quantity 
                                    &&
                                    <p className="text-base font-semibold mr-2">{ft.quantity}</p>
                                }
                                <p className="text-base" >{ft.featureName}</p>
                            </span>
                        ))
                            
                    }
                </div>
            </div>
            <form className="w-full p-4 flex flex-col md:flex-row justify-center">
                <div className="px-8 w-full md:w-1/2 flex flex-col justify-center items-start">
                    <label className="text-sm flex flex-col text-center w-full">
                    Tipo de inmueble
                    <input
                        required
                        type="text"
                        placeholder="Departamento"
                        name="type"
                        className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                    </label>
                    <label className="text-sm flex flex-col text-center w-full">
                        Provincia
                        <input
                            required
                            type="text"
                            placeholder="Chaco"
                            name="province"
                            className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </label>
                    <label className="text-sm flex flex-col text-center w-full">
                        Calle
                        <input
                            required
                            type="text"
                            placeholder="Sivori"
                            name="street"
                            className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </label>
                    <label className="text-sm flex flex-col text-center w-full">
                        Altura de calle
                        <input
                            required
                            type="text"
                            placeholder="150"
                            name="streetId"
                            className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </label>
                </div>
                <div className="px-8 w-full md:w-1/2 flex flex-col justify-center items-start">
                    <label className="text-sm flex flex-col text-center w-full ">
                        Identificador adcional (opcional)
                        <input
                        type="text"
                        placeholder="Ej: Dto. A"
                        name="streetId"
                        className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </label>
                    <label className="text-sm flex flex-col text-center w-full ">
                        Latitud (Decimal de hasta 14 decimales)
                        <input
                        type="number"
                        placeholder="-24,02491940210342"
                        name="streetId"
                        className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </label>
                    <label className="text-sm flex flex-col text-center w-full ">
                        Longitud (Decimal de hasta 14 decimales)
                        <input
                        type="number"
                        placeholder="24,02491940210342"
                        name="streetId"
                        className="p-2 m-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </label>
                    <div className="w-full flex justify-center w-full mb-auto">

                        <span className="w-1/3">

                            <Button type="submit" text="Agregar" accept/>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}