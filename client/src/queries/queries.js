import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      username
      id
    }
  }
`;

const GET_ROOMS_QUERY = gql`
  query GetRooms {
    getRooms {
      name
      id
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      id
      username
    }
  }
`;

const GET_ROOM_QUERY = gql`
  query Rooms($id: ID!) {
    getRoom(id: $id) {
      id
      name
    }
  }
`;

const DELETE_USER_QUERY = gql`
  query {
    deleteUser
  }
`;

const LOGOUT_USER_QUERY = gql`
  query {
    logoutUser
  }
`;

const ADD_USER_MUTATION = gql`
  mutation ($username: String!, $password: String!, $confirmPassword: String!) {
    addUser(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      id
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      username
      id
    }
  }
`;

const ADD_ROOM_MUTATION = gql`
  mutation ($name: String!, $password: String!) {
    addRoom(name: $name, password: $password) {
      name
      id
    }
  }
`;

const DELETE_ROOM_MUTATION = gql`
  mutation ($id: ID!, $password: String!) {
    deleteRoom(id: $id, password: $password)
  }
`;

export {
  GET_USERS_QUERY,
  GET_ROOMS_QUERY,
  GET_USER_QUERY,
  GET_ROOM_QUERY,
  DELETE_USER_QUERY,
  LOGOUT_USER_QUERY,
  ADD_USER_MUTATION,
  LOGIN_USER_MUTATION,
  ADD_ROOM_MUTATION,
  DELETE_ROOM_MUTATION,
};
