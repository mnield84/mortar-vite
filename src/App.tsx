import { QueryClient, QueryClientProvider } from "react-query";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";
import MainLayout from "./components/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Map />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
