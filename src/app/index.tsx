import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Provider from "./provider";
import Login from "@/pages/auth/login";
import ForgotPassword from "@/pages/auth/forgot-password";
import VerifyEmail from "@/pages/auth/verify-email";
import ResetPassword from "@/pages/auth/reset-password";
import Dashboard from "@/pages/features/components";
import Students from "@/pages/features/components/students";
import Classes from "@/pages/features/components/classes";
import LearningPath from "@/pages/features/components/learning-path";
import Assessment from "@/pages/features/components/assessment";
import Calendar from "@/pages/features/components/calendar";
import Leaderboard from "@/pages/features/components/leaderboard";
import Announcements from "@/pages/features/components/announcements";
import Users from "@/pages/features/components/users";
import AuditTrail from "@/pages/features/components/audit-trail";
import Settings from "@/pages/features/components/settings";
import DashboardLayout from "@/pages/features/layout/dashboard-layout";

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
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                {
                    path: "",
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "/dashboard/students",
                    element: <Students />,
                },
                {
                    path: "/dashboard/classes",
                    element: <Classes />,
                },
                {
                    path: "/dashboard/learning-path",
                    element: <LearningPath />,
                },
                {
                    path: "/dashboard/assessment",
                    element: <Assessment />,
                },
                {
                    path: "/dashboard/calendar",
                    element: <Calendar />,
                },
                {
                    path: "/dashboard/leaderboard",
                    element: <Leaderboard />,
                },
                {
                    path: "/dashboard/announcements",
                    element: <Announcements />,
                },
                {
                    path: "/dashboard/users",
                    element: <Users />,
                },
                {
                    path: "/dashboard/audit-trail",
                    element: <AuditTrail />,
                },
                {
                    path: "/dashboard/settings",
                    element: <Settings />,
                }
            ]
        },

    ]); return (
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
