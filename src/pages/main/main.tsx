import { Outlet } from "react-router-dom";
import { MainTabset } from "./ui/main-tabset/main-tabset";

function Main() {
  return (
    <>
      <header>
        App logo <MainTabset />
      </header>
      <Outlet />
    </>
  );
}

export { Main };
