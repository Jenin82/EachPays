import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound/NotFound";
import { Dashboard } from "./modules/Dashboard/Dashboard";
import CreateGroup from "./modules/CreateGroup/CreateGroup";
import ExpenseGroup from "./modules/ExpenseGroup/ExpenseGroup";

function App() {
    const router = createBrowserRouter([
        {
            path: "*",
            element: <NotFound />,
        },
        {
            path: "/404",
            element: <NotFound />,
        },
        {
			path: "/",
			element: <Dashboard />, 
		},
        {
			path: "/create",
			element: <CreateGroup />, 
		},
        {
			path: "/group/:id",
			element: <ExpenseGroup />, 
		}
    ]);
    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
