import React from "react";
import { useNavigate } from "react-router-dom";

interface GuardProps {
  element: React.ReactElement;
  params: any[];
}
const ProtectedRoute = ({ element, params }: GuardProps): React.ReactElement => {
  const navigate = useNavigate();
  if (!params.every(Boolean)) {
    navigate("/", { replace: true });
    return <></>;
  }
  return element;
};

export default ProtectedRoute;
