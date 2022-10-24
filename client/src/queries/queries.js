import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      username
      id
      rooms {
        name
        id
      }
    }
  }
`;

const GET_ROOMS_QUERY = gql`
  query {
    getRooms {
      name
      id
      owner {
        username
        id
      }
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      id
      username
      rooms {
        id
        name
      }
    }
  }
`;

const GET_ROOM_QUERY = gql`
  query Rooms($id: ID!) {
    getRoom(id: $id) {
      id
      name
      owner {
        username
        id
      }
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
      rooms {
        name
        id
      }
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      username
      id
      rooms {
        name
        id
      }
    }
  }
`;

const ADD_ROOM_MUTATION = gql`
  mutation ($name: String!) {
    addRoom(name: $name) {
      name
      id
      owner {
        username
        id
      }
    }
  }
`;

const DELETE_ROOM_MUTATION = gql`
  mutation ($id: ID!) {
    deleteRoom(id: $id)
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
