import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const getUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

export function UserList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading users</p>;
  }

  return (
    <div>
      <h1>UserList</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
