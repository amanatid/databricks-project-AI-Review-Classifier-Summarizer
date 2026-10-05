
import { useNavigate } from "react-router-dom"
import { AppHeader } from "../components/layout/AppHeader"
import{  AppShell } from "../components/layout/AppShell"
import { ProductsPanel } from "../components/products/ProductsPanel"
import { useProductsList } from "../hooks/useProductsList"

export function ProductsPage(){
    const  {products, loading, error}  = useProductsList()
    const navigate = useNavigate() 

    console.log(products,loading,error, "product loading error");
    return(
        <AppShell header={<AppHeader/>}> 
            <ProductsPanel
              products={products}
              error={error}
              loading={loading}
              onSelectProduct={(productId)=>{navigate(`/products/${productId}`)}}
            />
        </AppShell>
    )
}