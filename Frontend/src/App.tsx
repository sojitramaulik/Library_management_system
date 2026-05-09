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
          console.log(error)
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
      element: <Dashboard />,
    },
    {
      path: "/add/book",
      element: <AddBook />
    },
    {
      path: "/book/issue",
      element: <IssueBook />
    }
  ]);

  
  return (
    <>
     <div>
        <RouterProvider router={appRouter} />
     </div>
    </>
  );
}

export default App;
