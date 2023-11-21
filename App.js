import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/state/AuthProvider";
import NavBar from "./src/components/NavBar";
import { RemediosProvider } from "./src/state/RemediosProvider";
import { ConsultasProvider } from "./src/state/ConsultasProvider";
import { ExamesProvider } from "./src/state/ExamesProvider";

export default function App() {
  return (
    <AuthProvider>
      <RemediosProvider>
        <ConsultasProvider>
          <ExamesProvider>
            <NavigationContainer>
              <NavBar />
            </NavigationContainer>
          </ExamesProvider>
        </ConsultasProvider>
      </RemediosProvider>
    </AuthProvider>
  );
}
