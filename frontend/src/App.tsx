import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Autorization from "./views/autorization/Autorization";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Autorization />} />
        <Route path='autorization' element={<Autorization />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
