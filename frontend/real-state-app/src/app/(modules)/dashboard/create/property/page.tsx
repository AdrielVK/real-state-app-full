import { Suspense } from "react";
import Form from "./components/Form";

export default function Dashboard() {
  
  
  return (
    <div className="w-full p-8">
        <h2>Crear propiedad</h2>
        <Suspense>

          <Form/>
        </Suspense>

        
    </div>

  );
}
