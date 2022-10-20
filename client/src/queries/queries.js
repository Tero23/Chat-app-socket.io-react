import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
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
  query GetRooms {
    rooms {
      name
      id
    }
  }
`;

const GET_USER_QUERY = gql`
  query ($id: ID!) {
    user(id: $id) {
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
  query ($id: ID!) {
    room(id: $id) {
      id
      name
    }
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

const ADD_ROOM_MUTATION = gql`
  mutation ($name: String!, $userId: ID!) {
    addRoom(name: $name, userId: $userId) {
      name
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      name
    }
  }
`;

const DELETE_ROOM_MUTATION = gql`
  mutation ($id: ID!) {
    deleteRoom(id: $id) {
      name
    }
  }
`;

export {
  GET_USERS_QUERY,
  GET_ROOMS_QUERY,
  GET_USER_QUERY,
  GET_ROOM_QUERY,
  ADD_USER_MUTATION,
  DELETE_USER_MUTATION,
  ADD_ROOM_MUTATION,
  DELETE_ROOM_MUTATION,
};
