import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Provider from "./provider";
import Login from "@/pages/auth/login";
import ForgotPassword from "@/pages/auth/forgot-password";
import VerifyEmail from "@/pages/auth/verify-email";
import ResetPassword from "@/pages/auth/reset-password";
import Settings from "@/pages/auth/settinng/setting";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,
        },
        {
            path: "/verify-email",
            element: <VerifyEmail />,
        },
        {
            path: "/reset-password",
            element: <ResetPassword />,
        },
        {
            path: "/settings",
            element: <Settings />,
        }
    ])
    return (
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
