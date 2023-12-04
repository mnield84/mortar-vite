import { QueryClient, QueryClientProvider } from "react-query";
import Map from "./components/map";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Map />
    </QueryClientProvider>
  );
}

export default App;
