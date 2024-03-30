import { useQuery } from "@tanstack/react-query";
import { Post } from "../../shared/model/Post";
import { useParams } from "react-router-dom";

const usePostById = (id: string) => {
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch post with ID: ${id}`);
      }

      return response.json();
    },
  });

  const {
    data: comments,
    isError: areCommentserror,
    isLoading: areCommentsLoading,
  } = useQuery<any[]>({
    queryKey: ["posts", `${id}`, "comments"],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch comments for post with ID: ${id}`);
      }

      return response.json();
    },
  });

  const isLoading = isPostLoading || areCommentsLoading;
  const isError = isPostError || areCommentserror;

  return {
    isLoading,
    isError,
    data: !isLoading && !isError ? { ...post, comments } : undefined,
  };
};

export const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading, isError } = usePostById(postId!);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading post</p>;
  }

  return (
    <div>
      <h1>Post Page</h1>

      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <h3>Comments</h3>
          <ul>
            {post.comments?.map((comment: any) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
