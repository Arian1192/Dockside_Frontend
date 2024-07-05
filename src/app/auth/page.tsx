'use client'
import { AuthForm } from "@/components/AuthForm/AuthForm";
import { useEffect, useState } from "react";

export default function Page() {
    const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
           {domLoaded && <AuthForm />}
        </div>
    );
  }