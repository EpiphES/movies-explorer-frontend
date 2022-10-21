import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(undefined);
  
  useEffect(() => {
    let timeout;

    function getWindowWidth() {
      setWindowWidth(window.innerWidth);
    }
    
    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getWindowWidth();
        console.log(window.innerWidth) 
      }, '500');
    };
    

    window.addEventListener("resize", handleResize);
    
    getWindowWidth();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return windowWidth;
}
