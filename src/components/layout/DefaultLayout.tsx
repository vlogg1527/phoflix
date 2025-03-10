import { Box } from "@mui/joy";
import Navigation from "./Navigation/Navigation";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { scrollToTop } from "../../utils";
import Footer from "./Footer";
import ToastContainer from "../ToastContainer";

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IProps) => {
  const params = useParams();

  useEffect(() => scrollToTop(), [params]);

  return (
    <>
      <Box
        sx={{
          maxWidth: "100vw",
          marginTop: "60px",
          overflow: "hidden",
        }}
      >
        <Navigation />
        <Box
          sx={{
            padding: {
              xs: "16px",
              sm: "24px",
              lg: "32px",
            },
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>

      <ToastContainer />
    </>
  );
};

export default DefaultLayout;
