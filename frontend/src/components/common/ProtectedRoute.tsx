import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;