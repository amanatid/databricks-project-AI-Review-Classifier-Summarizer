import { useCallback, useEffect, useState } from "react";
import { api, type ProductSummary } from "../lib/api"


export  function useProductsList(){
     const [products, setProducts]  = useState<ProductSummary[]>([])
     const [loading, setLoading] = useState(true)
     const [error,  setError]= useState<string | null>(null)

    const loadProducts =  useCallback( ()=>{
          setLoading(true)

          api.products().then((response)=>{
            setProducts(response.products)
            setError(null)
          }).catch((loadError)=>setError(loadError  instanceof  Error  ? loadError.message  :  "Failed  to load  Products"))
          .finally(()=>setLoading(false))

    },[]);
    
    useEffect(()=>{ 
        loadProducts();
    },[loadProducts]);

    return {products,loading ,error}
}