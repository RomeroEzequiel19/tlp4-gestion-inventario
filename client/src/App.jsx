import { AuthProvider } from "./contexts/ContextAuth";
import { UserProvider } from "./contexts/ContextUser";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
