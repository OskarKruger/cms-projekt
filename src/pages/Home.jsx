import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InteractiveVideo from "../components/VideoPlayer";
import CmsIMG from "../assets/Cms.png";
import "../main.css";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Header />
      <Box className="banner" style={{ backgroundImage: `url(${CmsIMG})` }}>
        <h1
          style={{
            backdropFilter: "brightness(30%)",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          Welcome to our CMS website!
        </h1>
      </Box>
      <Box className="container">
        <Box className="video-container">
          <h2>Experience the world like never before</h2>
          <InteractiveVideo className="video-player" />
        </Box>
      </Box>
      <div className="advantages">
        <h1>Your secure content management system!</h1>
        <Grid container maxWidth="xl" spacing={2}>
          <Grid item lg={4}>
            <Card className="advantage__card">
              <CardContent className="advantage__card-content">
                {/* icon */}
                <Typography gutterBottom variant="h5">
                  Minimal effort
                </Typography>
                <Typography color="text.secondary">
                  With a minimal learning curve we help our customers and their employees to get the most out of our CMS.
                  Our CMS platform is designed to be user-friendly and intuitive, so that both our customers and 
                  their employees can quickly learn and utilize its features to maximize productivity and efficiency.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="advantage__card">
              <CardContent className="advantage__card-content">
                
                <Typography gutterBottom variant="h5">
                  Your branding
                </Typography>
                <Typography color="text.secondary">
                  Get your personal touches on your CMS. With our CMS you can customize your own logo, colors and more.
                  We offer 100% customization to fit your needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="advantage__card">
              <CardContent className="advantage__card-content">
                
                <Typography gutterBottom variant="h5">
                  100% secure
                </Typography>
                <Typography color="text.secondary">
                  We take security very seriously. We use the latest technologies to ensure that your data is safe and secure.
                  We also offer a 24/7 support team to help you with any issues you might have.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </div>
    </>
  );
}

export default Home;

