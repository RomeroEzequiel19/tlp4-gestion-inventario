import { AuthProvider } from "./contexts/ContextAuth";
import { DeviceProvider } from "./contexts/ContextDevice";
import { MaintenanceProvider } from "./contexts/ContextMaintenance";
import { UserProvider } from "./contexts/ContextUser";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <MaintenanceProvider>
          <DeviceProvider>
            <AppRoutes />
          </DeviceProvider>
        </MaintenanceProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
