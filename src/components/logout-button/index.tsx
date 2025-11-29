import { useContext } from "react";
import { AuthenticatorContext } from "../../contexts/Authenticator";

const LogoutButton = () => {
  const { logout } = useContext(AuthenticatorContext);
  
  return (<button onClick={logout}>Logout</button>);
}

export default LogoutButton;