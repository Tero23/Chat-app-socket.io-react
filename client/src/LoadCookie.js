import { gql, useQuery } from "@apollo/client";

const SET_COOKIE = gql`
  query Query {
    setCookie
  }
`;

const LoadCookie = () => {
  const { loading, error, data } = useQuery(SET_COOKIE);

  if (loading) return null;
  if (error) return `Error ${error}`;
  console.log(data);
  return (
    <div>
      <h1>Cookie: {data.setCookie}</h1>
    </div>
  );
};

export default LoadCookie;
