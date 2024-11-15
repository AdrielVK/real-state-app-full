import Navbar from "@/app/components/Navbar";
import AdminGuard from "../auth/components/AdminGuard";
import { HeaderDashboard } from "./components/HeaderDashboard";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <AdminGuard>
        <Navbar/>
        <main className="flex flex-col  items-center sm:items-start p-8 min-h-screen">
        <HeaderDashboard/>
            {children}
        </main>
    </AdminGuard>
    
      
  );
}
