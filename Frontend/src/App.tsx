import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/HomePage.tsx';
import SignUp from './pages/Auth/SignUp.tsx';
import SignIn from './pages/Auth/SignIn.tsx';

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/auth/signup",
      element: <SignUp />
    },
    {
      path: "/auth/signin",
      element: <SignIn />
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
