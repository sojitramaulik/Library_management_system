import Box from "@mui/material/Box";
import image from "../assets/library.jpg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ImageHome() {
  return (
    <div>
      <Box
        sx={{
          height: "90vh",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          paddingTop: "50px",
          paddingLeft: "50px",
          flexDirection: "column",
        }}
      >
        {/* Main Heading */}
        <Typography
          variant="h2"
          sx={{
            color: "#f8fafc",
            fontWeight: "bold",
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          Read. Learn. Grow.! .......
          {/* Description */}
          <Typography
            variant="h6"
            sx={{
              color: "#f8fafc",
              marginTop: "20px",
              maxWidth: "600px",
             // backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: "10px",
              padding: "20px",
              lineHeight: 1.8,
              textShadow: "1px 1px 5px black",
            }}
          >
            Discover a smarter way to manage books, students, and library
            records. Access resources easily, keep everything organized, and
            improve learning experiences. Built to make reading, learning, and
            library management simple and efficient.
            <br />
            <Button
              variant="contained"
              href="/auth/signup"
              sx={{
                marginTop: "30px",
                // marginLeft: "30px",
                backgroundColor: "#0f4c5c",
              }}
            >
              Get Started
            </Button>
          </Typography>
        </Typography>
      </Box>
    </div>
  );
}
