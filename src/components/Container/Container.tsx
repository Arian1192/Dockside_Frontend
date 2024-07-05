"use client"
import { NextFont } from "next/dist/compiled/@next/font";
import Sidebar from "../Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import AuthPage from "@/app/auth/page";
import Navbar from "@/components/Navbar/Navbar";

interface Props {
  inter: NextFont;
  children: React.ReactNode;
}

// Use client directive to mark Container as client-side only
const Container: React.FC<Props> = ({ inter, children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen">
      {pathname === "/auth" ? (
        <AuthPage />
      ) : (
        <div>
          <Navbar />
          <div className="hidden fixed md:block w-[300px] top-[72px] bottom-0 bg-primary">
            <Sidebar />
          </div>
          <div className="flex-1 mt-[72px] md:ml-[300px] overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
