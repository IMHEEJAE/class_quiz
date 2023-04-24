// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Layout from "../src/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { AppProps } from "next/app";
import ApolloSetting from "../src/commons/apollo";
import { RecoilRoot } from "recoil";

function App({ Component }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles} />
        <Layout>
          <Component />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}

export default App;
