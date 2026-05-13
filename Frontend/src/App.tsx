import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/HomePage.tsx';
import SignUp from './pages/Auth/SignUp.tsx';
import SignIn from './pages/Auth/SignIn.tsx';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser,logout } from './redux/authSlice.ts';
import Dashboard from './pages/Dashboard.tsx'
import AddBook from './pages/AddBook.tsx';
import IssueBook from './pages/IssueBook.tsx';
import ProtectedRoute from './utils/ProtectedRoute.tsx';
import { Toaster } from "react-hot-toast";
import StudentTable from './components/StudentTable.tsx';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

      const checkAuth = async () => {
        
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/me`,
            {
              withCredentials: true,
            }, 
          );

          dispatch(setUser(response.data.user));

        } catch (error) {
          dispatch(logout());
          console.log("user not logged in")
        }
      };

      checkAuth();

  },[]);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/auth/signup",
      element: <SignUp />,
    },
    {
      path: "/auth/signin",
      element: <SignIn />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add/book",
      element: (
        <ProtectedRoute>
          <AddBook />
        </ProtectedRoute>
      ),
    },
    {
      path: "/book/issue",
      element: (
        <ProtectedRoute>
          <IssueBook />
        </ProtectedRoute>
      ),
    },
    {
       path:"/data",
       element: (
         <ProtectedRoute>
             <StudentTable />
         </ProtectedRoute>
       )
    },
    {
      path: "/*",
      element: <Homepage />
    }
   

  ]);

  
  return (
    <>
      <Toaster position="top-right" />
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
