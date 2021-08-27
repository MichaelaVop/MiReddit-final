import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { NavBar } from '../components/NavBar';
import theme from "../theme";
import { createUrqlClient } from '../utils/createUrqlClient';

const MyApp = ({ Component, pageProps }: any) => {
  return (
 
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <NavBar />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
   
  )
}

export default withUrqlClient(createUrqlClient) (MyApp);
