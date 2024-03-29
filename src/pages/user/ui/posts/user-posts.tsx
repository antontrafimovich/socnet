import { useQueries, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../../../shared/model/Post";

const useUserPosts = (userId: string) => {
  const {
    data: posts,
    isLoading: arePostsLoading,
    isError: arePostsInError,
  } = useQuery<Post[]>({
    queryKey: ["users", userId, "posts"],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }

      return response.json();
    },
  });

  const comments = useQueries<Comment[]>({
    queries: posts
      ? posts.map(({ id: postId }) => {
          console.log('in user', ["posts", postId, "comments"].toString());
          return {
            queryKey: ["posts", `${postId}`, "comments"],
            staleTime: Infinity,
            queryFn: async () => {
              const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
              );

              if (!response.ok) {
                throw new Error(
                  `Failed to fetch comments for post with ID: ${postId}`
                );
              }

              return response.json();
            },
          };
        })
      : [],
  });

  const isLoading =
    arePostsLoading || comments.some((comment) => comment.isLoading);

  const isError =
    arePostsInError || comments.some((comment) => comment.isError);

  return {
    data:
      !isLoading && !isError
        ? posts?.map((post, index) => ({
            ...post,
            comments: comments[index].data as any[],
          }))
        : undefined,
    isLoading,
    isError,
  };
};

const useUserId = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    throw new Error("No user ID provided");
  }

  return userId;
};

export const UserPosts: React.FC = () => {
  const userId = useUserId();
  const { data: posts, isLoading, isError } = useUserPosts(userId);

  if (isLoading) {
    return <div>Loading user posts...</div>;
  }

  if (isError) {
    return <div>Error fetching user posts</div>;
  }

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <h5>{post.comments.length}</h5>
        </li>
      ))}
    </ul>
  );
};
