/* eslint-disable import/no-anonymous-default-export */
export default {
  body: {
    overflowX: "hidden",
    bg: "brand.100",
    color: "white",
    fontFamily: "DM Sans",
    letterSpacing: "-0.5px",
  },
  html: {
    fontFamily: "DM Sans",
  },
  ".container": {
    height: "100vh",
    width: "100vw",
    maxHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
  },
  ".scroll": {
    "::-webkit-scrollbar": {
      height: 1.5,
      width: 1.5,
    },
    "::-webkit-scrollbar-track": {
      bgColor: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      bgColor: "#DEE1E5",
      borderRadius: "8px",
    },
    "::-webkit-scrollbar-corner": {},
  },
};
