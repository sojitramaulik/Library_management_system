import Box from "@mui/material/Box";
import image from "../assets/library.jpg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

export default function ImageHome() {
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `  linear-gradient(
                to right,
                rgba(0,0,0,0.85) 0%,
                rgba(0,0,0,0.75) 35%,
                rgba(0,0,0,0.65) 60%,
                rgba(0,0,0,0.1) 100%
              ), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: `
              0 8px 32px rgba(0,0,0,0.35)
            `,
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          paddingTop: "50px",
          paddingLeft: "50px",
          flexDirection: "column",
        }}
      >
        {/* Main Heading */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#f8fafc",
              fontWeight: "bold",
              textShadow: `
              0 0 8px rgba(255,255,255,0.5),
              1px 1px 8px black
            `,
              // backgroundColor: "rgba(0,0,0,0.7)",
              // padding: "20px",
              // borderRadius: "20px",
            }}
          >
            Read. Learn. Grow.! .......
          </Typography>
        </motion.div>

        {/* Description */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#f8fafc",
              marginTop: "20px",
              maxWidth: "600px",
              // backgroundColor: "rgba(0,0,0,0.7)",
              // borderRadius: "10px",
              // padding: "20px",
              lineHeight: 1.8,
              textShadow: `
              0 0 8px rgba(255,255,255,0.5),
              1px 1px 8px black
            `,
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
                borderRadius: "14px",
                paddingX: "24px",
                paddingY: "10px",
                background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                boxShadow: "0 0 20px rgba(20,184,166,0.4)",
                backgroundColor: "bg-[#084740]",
                marginTop:"35px",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: "bg-[#03312c]",
                },
              }}
            >
              Get Started
            </Button>
          </Typography>
        </motion.div>
      </Box>
    </div>
  );
}
