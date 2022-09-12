import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import RTL from "../src/theme/RTL";
import ThemeSettings from "../src/theme/ThemeSettings";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import BlankLayout from "../src/layouts/BlankLayout";
import "../styles/style.scss";
import wrapper from "../src/store/Store";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const layouts = {
  Blank: BlankLayout,
};

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Gettheme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  const Layout = layouts[Component.layout] || BlankLayout;
  const router = useRouter();

  if(router.pathname.startsWith("/dashboard")) {
    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>EaziFlex - Easily Get Airtime and Data</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={Gettheme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            <FullLayout>
              <Component {...pageProps} />
            </FullLayout>
          </RTL>
        </ThemeProvider>
      </CacheProvider>
    );
  } else {
    return (<CacheProvider value={emotionCache}>
      <Head>
        <title>EaziFlex - Easily Get Airtime and Data</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={Gettheme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RTL>
      </ThemeProvider>
    </CacheProvider>);
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
