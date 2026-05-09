import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Avatar from "@mui/material/Avatar";

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
      <AppBar position="static" sx={{ backgroundColor: "#0f4c5c" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-between w-full">
            <div className="flex justify-between">
              <div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Library Management System
                </Typography>
              </div>
              <div className="flex justify-evenly ml-10 ">
                <Button href="/add/book">Book</Button>
                <Button href="/book/issue">BookIssue</Button>
                <Button href="/dashboard">BookFetch</Button>
              </div>
            </div>

            {user && (
              <div>
                <Button color="inherit" href="/auth/signup">
                  SignUp
                </Button>
                <Button color="inherit" href="/auth/signin">
                  Login
                </Button>
              </div>
            )}

            {!user && (
              <div className="flex p-2">
                <div className="p-2">
                  <Button color="inherit" href="/auth/signup">
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
