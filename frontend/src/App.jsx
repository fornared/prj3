import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { TourSearch } from "./page/tour/TourSearch.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";
import { Navbar } from "./component/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),

    children: [
      {
        index: true,
      },
      { path: "board/write", element: <BoardWrite /> },
      { path: "board", element: <BoardList /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "login", element: <MemberLogin /> },
      { path: "member/list", element: <MemberList /> },
      { path: "signup", element: <MemberSignup /> },
      { path: "home", element: <Home /> },
      { path: "tour", element: <TourSearch /> },
    ],
  },
]);

function App(props) {
  return (
    <ChakraProvider>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </ChakraProvider>
  );
}

export default App;
