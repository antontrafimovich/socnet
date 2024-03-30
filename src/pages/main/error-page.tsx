import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>404</h1>
      <p>{(error as any).statusText || (error as any).message}</p>
    </>
  );
}
