import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../main.css";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function Home() {
  return (
    <>
      <Header />
      <Box className="banner">
        <h1>Welcome to our CMS website!</h1>
      </Box>
      <Container className="cms">
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
                  With a minimal learning curve we help our customers and their
                  employees to get the most out of our CMS. Our CMS platform is
                  designed to be user-friendly and intuitive, so that both our
                  customers and their employees can quickly learn and utilize
                  its features to maximize productivity and efficiency.
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
                  Get your personal touches on your CMS. With our CMS you can
                  customize your own logo, colors and more. We offer 100%
                  customization to fit your needs.
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
                  We take security very seriously. We use the latest
                  technologies to ensure that your data is safe and secure. We
                  also offer a 24/7 support team to help you with any issues you
                  might have.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </Container>
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'primary.main',
            color: 'common.white',
            py: 3,
            my: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="h4">Our Exclusive Offers</Typography>
          <Box></Box>
        </Box>





      <Container className="cms" sx={{mt: "30px"}}>
        <Grid container spacing={2}>
          <Grid item lg={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  John Doe
                </Typography>
                <Typography color="text.secondary">
                  This CMS system is so good! It's user-friendly and efficient,
                  making it a breeze to manage my content.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Jane Smith
                </Typography>
                <Typography color="text.secondary">
                  I love how customizable this CMS is! I can tailor it to my
                  brand's style, making it feel truly unique.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Mike Johnson
                </Typography>
                <Typography color="text.secondary">
                  The security features in this CMS are top-notch! I can trust
                  that my data is safe and well-protected.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </Container>
    </>
  );
}

export default Home;
