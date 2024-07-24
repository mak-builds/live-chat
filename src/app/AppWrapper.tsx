"use client";
import React, { ReactNode, Suspense } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "react-redux";

import theme from "@/themes";
import store from "@/redux/store";

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <Box className="container">{children}</Box>
          </ChakraProvider>
        </CacheProvider>
      </Provider>
    </Suspense>
  );
}
