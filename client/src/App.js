import { Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import NotFound from "./pages/NotFound";
import Header from "./Header";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import ProtectedRoutes from "./context/ProtectedRoutes";
import { SignInContext } from "./context/SignInContext";
import Rooms from "./pages/Rooms";

const link = createHttpLink({
  uri: "http://localhost:3002/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <SignInContext.Provider
        value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}
      >
        <ApolloProvider client={client}>
          <Header />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/rooms" element={<Rooms />} />
            </Route>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApolloProvider>
      </SignInContext.Provider>
    </>
  );
}

export default App;
