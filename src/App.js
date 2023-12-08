import SearchHeader from "./components/SearchHeader";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YoutubeApiProvider } from "./context/YoutubeApiContext";

const qeuryClient = new QueryClient();

function App() {
    return (
        <>
            <SearchHeader />

            <YoutubeApiProvider>
                <QueryClientProvider client={qeuryClient}>
                    <Outlet />
                </QueryClientProvider>
            </YoutubeApiProvider>
        </>
    );
}

export default App;
