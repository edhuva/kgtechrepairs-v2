import { useState, useEffect } from 'react';

//persist login hook
const usePersist = () => {

  //get persist state
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() => {
      //store persist state
      localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

  return [persist, setPersist]
}

export default usePersist
