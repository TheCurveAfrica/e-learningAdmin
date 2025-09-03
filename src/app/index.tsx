import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Provider from "./provider";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Home</div>,
        },
        {
            path: "/about",
            element: <div>About</div>,
        },
    ])
    return (
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
