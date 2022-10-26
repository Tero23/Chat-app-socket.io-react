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
import Header from "./components/Header";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import ProtectedRoutes from "./context/ProtectedRoutes";
import { SignInContext } from "./context/SignInContext";
import Rooms from "./pages/Rooms";
import Chat from "./pages/Chat";

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
  const [roomName, setRoomName] = useState("");
  return (
    <>
      <SignInContext.Provider
        value={{
          username,
          setUsername,
          isLoggedIn,
          setIsLoggedIn,
          roomName,
          setRoomName,
        }}
      >
        <ApolloProvider client={client}>
          <Header />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/joinRoom" element={<ChatPage />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/chat" element={<Chat />} />
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
