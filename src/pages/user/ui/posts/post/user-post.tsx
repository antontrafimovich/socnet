import React from "react";
import { useQuery } from "@tanstack/react-query";

type Post = {
  postId: number;
  title: string;
};

type Comment = {
  commentId: number;
  text: string;
};

type UserPostProps = {
  post: Post;
};

const useComments = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ["posts", postId, "comments"],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch comments for post with ID: ${postId}`);
      }

      return response.json();
    },
  });
};

const UserPost: React.FC<UserPostProps> = ({ post }) => {
  const { data: comments, isLoading } = useComments(post.postId);

  return (
    <div>
      <h2>{post.title}</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <p>Comments count: {comments?.length}</p>
      )}
    </div>
  );
};

export default UserPost;
