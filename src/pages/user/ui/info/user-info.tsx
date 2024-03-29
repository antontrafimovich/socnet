import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { User } from "../../../../shared/model/User";

export const UserInfo: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        (response) => response.json()
      ),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      {data && (
        <div>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};
