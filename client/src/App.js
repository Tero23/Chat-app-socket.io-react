import { Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import NotFound from "./NotFound";
import Header from "./Header";
import Register from "./Register";
import ChatPage from "./ChatPage";
import Login from "./Login";

const link = createHttpLink({
  uri: "http://localhost:3002/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
