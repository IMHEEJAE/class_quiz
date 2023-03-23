import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
export default function ApolloSetting(props) {
  const client = new ApolloClient({
    uri: "http://practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </>
  );
}
