
import "./App.css";
import { AuthenticatorProvider } from "./contexts/Authenticator";
import Root from "./pages/root";

function App() {
  return (
    <AuthenticatorProvider>
      <Root />
    </AuthenticatorProvider>
  )
}

export default App
