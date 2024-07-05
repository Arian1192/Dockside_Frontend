'use client'
import { useEffect, useState } from "react";

export default function Page() {
    const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

    return (
        <>
           {domLoaded && <h1>Config Section</h1>}
        </>
    );
  }