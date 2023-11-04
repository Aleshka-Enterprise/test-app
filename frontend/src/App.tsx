import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Autorization from "./views/autorization/Autorization";
import UsersService from "./services/users/users.service";
import Home from "./views/home/Home";
import TestPreview from "./views/test-preview/TestPreview";
import { ITest } from "./models/tests/tests";

function App(): React.ReactElement {
  const [selectedTest, setSelectedTest] = useState<ITest>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      UsersService.getCurrentUser();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setSelectedTest={setSelectedTest} />} />
        <Route path="autorization" element={<Autorization />} />
        {selectedTest && <Route path="preview" element={<TestPreview selectedTest={selectedTest} />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
