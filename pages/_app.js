import "../styles/globals.css";
import Layout from "../components/layout/Layout.js";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        {/* <CookiesProvider> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        {/* </CookiesProvider> */}
      </RecoilRoot>
    </>
  );
}

export default MyApp;
