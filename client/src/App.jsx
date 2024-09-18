import { AuthProvider } from "./contexts/ContextAuth";
import { DeviceProvider } from "./contexts/ContextDevice";
import { UserProvider } from "./contexts/ContextUser";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <DeviceProvider>
          <AppRoutes />
        </DeviceProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
