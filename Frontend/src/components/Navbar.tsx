import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Avatar from "@mui/material/Avatar";
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
        className="!flex !p-2"
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
                      isActive
                        ? "text-white bg-[#084740] px-4 py-2 rounded"
                        : "px-4 py-2"
                    }
                  >
                    Book
                  </NavLink>
                  <NavLink
                    to="/book/issue"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#084740] px-4 py-2 rounded"
                        : "px-4 py-2"
                    }
                  >
                    BookIssue
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#084740] px-4 py-2 rounded"
                        : "px-4 py-2"
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
                <div className="p-2">
                  <Avatar alt={user?.firstName} src={user?.image} />
                </div>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
