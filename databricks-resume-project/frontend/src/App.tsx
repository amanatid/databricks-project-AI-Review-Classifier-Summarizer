import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom"
import { ProductsPage } from "./pages/ProductsPage"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"


function App() {
  

  return (
  <BrowserRouter>
    <Routes>
       <Route path="/" element={<ProductsPage/>} />
       <Route path="/products/:productId" element={<ProductDetailsPage/>} />  
       <Route path="*" element={<Navigate to='/' replace/>} /> 
    </Routes>
  </BrowserRouter>
  )
}

export default App
