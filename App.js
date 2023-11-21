import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/state/AuthProvider";
import NavBar from "./src/components/NavBar";
import { RemediosProvider } from "./src/state/RemediosProvider";
import { ConsultasProvider } from "./src/state/ConsultasProvider";

export default function App() {
  return (
    <AuthProvider>
      <RemediosProvider>
        <ConsultasProvider>
          <NavigationContainer>
            <NavBar />
          </NavigationContainer>
        </ConsultasProvider>
      </RemediosProvider>
    </AuthProvider>
  );
}
