import { Box, Container, Menu, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          <div></div>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "space-between",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2023. [OBKSoftware] Limited
          </Typography>
          <a href="https://OBKSoftware.dk" target='_blank' style={{ textDecoration: 'none'}} >
          OBKSoftware.dk
          </a>
        </Box>
      </Container>
    </Paper>
  );
}

export default Footer;
