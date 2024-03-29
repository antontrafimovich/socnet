import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <header>App logo</header>
      <Outlet />
    </>
  );
}

export { Main };
