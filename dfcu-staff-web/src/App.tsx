import { RouterProvider } from "react-router-dom";
import LayoutContextProvider from "./context/LayoutContext";
import router from "./router/router";

function App() {
    return (
        <LayoutContextProvider>
            <RouterProvider router={router} />
        </LayoutContextProvider>
    );
}

export default App;
