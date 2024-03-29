import { Link } from "react-router-dom";
import { UserInfo } from "./ui/info/user-info";
import { UserPosts } from "./ui/posts/user-posts";

export const User: React.FC = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Link to="/">Back</Link>
        <h1>User Page</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <UserInfo />
        </div>
        <div style={{ flex: 1 }}>
          <UserPosts />
        </div>
      </div>
    </div>
  );
};
