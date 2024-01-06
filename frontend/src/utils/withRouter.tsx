import React from "react";
import { useNavigate } from "react-router-dom";

function withRouter<P>(Component: React.ComponentType<P>): React.FC<P> {
  const Wrapper: React.FC<P> = props => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
}

export default withRouter;
