import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Autorization from "./views/autorization/Autorization";
import UsersService from "./services/users/users.service";
import Home from "./views/home/Home";
import TestPreview from "./views/test-preview/TestPreview";
import { ITest } from "./models/tests/tests";
import { observer } from "mobx-react";
import UsersStore from "./store/users";
import Test from "./views/test/Test";
import TestResult from "./views/test-result/TestResult";
import Registration from "./views/registration/Registration";

const App = observer((): React.ReactElement => {
  const [selectedTest, setSelectedTest] = useState<ITest>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      UsersService.getCurrentUser().then(res => {
        UsersStore.user = res;
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='home' replace />} />
        <Route path='home' element={<Home setSelectedTest={setSelectedTest} />} />
        <Route path='autorization' element={<Autorization />} />
        <Route path='registration' element={<Registration />} />
        {selectedTest && <Route path='preview' element={<TestPreview />} />}
        {selectedTest && UsersStore.user && <Route path='test' element={<Test />} />}
        {selectedTest && UsersStore.user && (
          <Route path='result' element={<TestResult selectedTest={selectedTest} />} />
        )}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
