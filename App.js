import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/state/AuthProvider";
import NavBar from "./src/components/NavBar";
import { RemediosProvider } from "./src/state/RemediosProvider";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RemediosProvider>
          <NavBar />
        </RemediosProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
