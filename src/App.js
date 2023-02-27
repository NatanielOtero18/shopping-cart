
import './App.css';
import React from 'react';
import { useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import MainView from './components/mainView/mainView';
import ShoppingPage from './components/shop/shop';
import { CaseComponent, CPU, GPU, Mother, PSU, RAM, StorageComp } from './components/Parts/Parts';


const App = () => {

  const [cartList, setCartList] = useState(
    {
      CPU: {
        id: "",
        brand: "",
        model: "",
        socket: ""
      },
      Motherboard: {

        id: "",
        brand: "",
        model: "",
        socket: ""
      }
      
    }
  );

  const addComponent = (type, item) => {
    setCartList(prevList => ({
      ...prevList,
      [type]: item
    }));
  }

  const removeCoreComponent = (type) => {
    setCartList(prevList => ({
      ...prevList,
      [type]: {

        id: "",
        brand: "",
        model: "",
        socket: ""
      }
    }));
  }



  const emptyCart = () => {
    setCartList({
      CPU: {
        id: "",
        brand: "",
        family: "",
        model: "",
        socket: ""
      },
      Motherboard: {

        id: "",
        brand: "",
        model: "",
        socket: ""
      }
    });
  }

  return (<div>
    <BrowserRouter>
      <Navbar cartList={cartList} emptyCart={emptyCart} />
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
        <Route path="/" element={<MainView />} />
        <Route path="Shop" element={<ShoppingPage cartList={cartList} removeCoreComponent={removeCoreComponent}/>}>
          <Route path="CPU" element={<CPU cartList={cartList} addComponent={addComponent} />} />
          <Route path="Motherboard" element={<Mother cartList={cartList} addComponent={addComponent} />} />
          <Route path="GPU" element={<GPU cartList={cartList} addComponent={addComponent} />} />
          <Route path="RAM" element={<RAM  cartList={cartList} addComponent={addComponent} />} />
          <Route path="PSU" element={<PSU cartList={cartList} addComponent={addComponent}  />} />
          <Route path="Storage" element={<StorageComp cartList={cartList} addComponent={addComponent} />} />
          <Route path="Case" element={<CaseComponent cartList={cartList} addComponent={addComponent} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </div>);
}
export default App;
