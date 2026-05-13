import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import { Library } from "lucide-react";

export default function ButtonAppBar() {

  const user = useSelector((state: RootState) => state.auth.user) as {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    image: string;
  } | null;


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(4, 47, 46, 0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `
                0 8px 32px rgba(0,0,0,0.35)
              `,
          backgroundColor: "rgba(4,47,46,0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Library size={32} color="#5eead4" />

          <div className="flex items-center justify-between w-full">
            <div className="flex justify-between">
              <div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Library Management System
                </Typography>
              </div>

              {user && (
                <div className="flex gap-5 items-center ml-10 text-teal-400 ">
                  <NavLink
                    to="/add/book"
                    className={({ isActive }) =>
                      `
                        relative text-slate-100 font-medium transition-all duration-300 hover:text-teal-300
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                        after:bg-teal-300 after:transition-all after:duration-300
                        ${isActive ? "text-teal-300 after:w-full drop-shadow-[0_0_8px_rgba(94,234,212,0.8)]" : "after:w-0 hover:after:w-full"}`
                    }
                  >
                    Book
                  </NavLink>

                  <NavLink
                    to="/book/issue"
                    className={({ isActive }) =>
                      `
                        relative text-slate-100 font-medium transition-all duration-300 hover:text-teal-300
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                        after:bg-teal-300 after:transition-all after:duration-300
                        ${isActive ? "text-teal-300 after:w-full drop-shadow-[0_0_8px_rgba(94,234,212,0.8)]" : "after:w-0 hover:after:w-full"}`
                    }
                  >
                    BookIssue
                  </NavLink>

                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `
                        relative text-slate-100 font-medium transition-all duration-300 hover:text-teal-300
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                        after:bg-teal-300 after:transition-all after:duration-300
                        ${isActive ? "text-teal-300 after:w-full drop-shadow-[0_0_8px_rgba(94,234,212,0.8)]" : "after:w-0 hover:after:w-full"}`
                    }
                  >
                    BookFetch
                  </NavLink>
                </div>
              )}
            </div>

            {!user && (
              <div className="flex p-3 mr-10 gap-5">
                <Button
                  color="inherit"
                  sx={{
                    borderRadius: "14px",
                    paddingX: "24px",
                    background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                    boxShadow: "0 0 20px rgba(20,184,166,0.4)",
                    backgroundColor: "bg-[#084740]",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      backgroundColor: "bg-[#03312c]",
                    },
                  }}
                  href="/auth/signup"
                >
                  SignUp
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    borderRadius: "14px",
                    paddingX: "24px",
                    paddingY: "10px",
                    background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                    boxShadow: "0 0 20px rgba(20,184,166,0.4)",
                    backgroundColor: "bg-[#084740]",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      backgroundColor: "bg-[#03312c]",
                    },
                  }}
                  href="/auth/signin"
                >
                  Login
                </Button>
              </div>
            )}

            {user && (
              <div className="flex gap-5 p-2">
                <div className="p-2">
                  <Button
                    sx={{
                      borderRadius: "14px",
                      paddingX: "24px",
                      paddingY: "10px",
                      background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                      boxShadow: "0 0 20px rgba(20,184,166,0.4)",
                      backgroundColor: "bg-[#084740]",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        backgroundColor: "bg-[#03312c]",
                      },
                    }}
                    color="inherit"
                    href="/auth/signup"
                  >
                    Logout
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={user?.image}
                    alt="profile"
                    className="
                        w-11 h-11
                        rounded-full
                        object-cover
                        border-2 border-teal-300
                        hover:scale-105
                        transition-all duration-300
                        shadow-[0_0_18px_rgba(45,212,191,0.45)]
                      "
                  />
                  <span className="text-slate-100 font-medium">
                    {user?.firstName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
