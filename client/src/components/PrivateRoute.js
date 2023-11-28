import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"; //useNavigate is a hook and Navigate is a component

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;  // when a user is not signed in and typed profile in the url,
  //he will be directed to sign in page
}
