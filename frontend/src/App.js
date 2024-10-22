import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import CentralSchemes from './pages/CentralSchemes/CentralSchemes';
import StateSchemes from './pages/StateSchemes/StateSchemes';
import Tools from './pages/Tools/Tools';
import Support from './pages/Support/Support';
import Dashboard from './pages/Dashboard/Dashboard';
import ToolDetails from './pages/ToolsDetails/ToolsDetail';
import NavbarComponent from './components/Navbar/NavbarComponent';
import AddTool from './pages/AddTool/AddTools'
import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage/CartPage';
import KommunicateChat from './KommunicateChat';

//  Wrapper component to hide Navbar on certain routes
// const AppWrapper = () => {
//   const [cartCount, setCartCount] = useState(0);
//   const location = useLocation();

//   const incrementCartCount = () => {
//     setCartCount((prevCount) => prevCount + 1);
//   };

//   // Define pages where the Navbar should be hidden
//   const hideNavbarRoutes = ['/login'];

//   return (
//     <div className="App">
//       {/* Conditionally render Navbar based on the route */}
//       {!hideNavbarRoutes.includes(location.pathname) && (
//         <NavbarComponent cartCount={cartCount} />
//       )}

//     </div>
//   );
// };

function App() {
  return (
    <div className="App">
    <CartProvider>
    <BrowserRouter>
    <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/central-schemes" element={<CentralSchemes />} />
        <Route path="/state-schemes" element={<StateSchemes />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/add-tool"element={<AddTool/>} />
        <Route path="/support" element={<Support />} />
        <Route path="/tools/:id" element={<ToolDetails  />} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
       
    </BrowserRouter>
    </CartProvider>
    </div>
  );
}

export default App;
