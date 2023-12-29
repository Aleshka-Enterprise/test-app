import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Autorization from "./views/autorization/Autorization";
import UsersService from "./services/users/users.service";
import Home from "./views/tests-list/TestsList";
import TestPreview from "./views/test-preview/TestPreview";
import { observer } from "mobx-react";
import UsersStore from "./store/UsersStore";
import Test from "./views/test/Test";
import TestResult from "./views/test-result/TestResult";
import Registration from "./views/registration/Registration";
import Profile from "./views/profile/Profile";
import ErrorModal from "./components/error-modal/ErrorModal";
import TestsStore from "./store/TestsStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import SuccessBox from "./components/success-box/SuccessBox";

const App = observer((): React.ReactElement => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      UsersService.getCurrentUser().then(res => {
        UsersStore.user = res;
      });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='home' replace />} />
          <Route path='home' element={<Home />} />
          <Route path='autorization' element={<Autorization />} />
          <Route path='registration' element={<Registration />} />
          <Route
            path='preview'
            element={<ProtectedRoute element={<TestPreview />} params={[TestsStore.selectedTest]} />}
          />
          <Route
            path='test'
            element={<ProtectedRoute element={<Test />} params={[TestsStore.selectedTest, UsersStore.user]} />}
          />
          <Route path='profile' element={<ProtectedRoute element={<Profile />} params={[UsersStore.user]} />} />
          <Route
            path='users_tests'
            element={<ProtectedRoute element={<Home onlyUserTest={true} />} params={[UsersStore.user]} />}
          />
          <Route
            path='result'
            element={<ProtectedRoute element={<TestResult />} params={[TestsStore.selectedTest, UsersStore.user]} />}
          />
          <Route path='create-test' element={<ProtectedRoute element={<TestPreview />} params={[UsersStore.user]} />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
      <ErrorModal />
      <SuccessBox />
    </>
  );
});

export default App;
