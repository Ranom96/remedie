import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/state/AuthProvidder";
import NavBar from "./src/components/NavBar";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    </NavigationContainer>
  );
}
