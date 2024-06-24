import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardList } from "./page/board/BoardList";
import { BoardView } from "./page/board/BoardView";
import { TourSearch } from "./page/tour/TourSearch";
import { MemberLogin } from "./page/member/MemberLogin";
import { MemberList } from "./page/member/MemberList";
import { MemberSignup } from "./page/member/MemberSignup";
import { LoginProvider } from "./component/LoginProvider";
import { Navbar } from "./component/Navbar";
import { BoardEdit } from "./page/board/BoardEdit";
import Announcement from "./page/menu/Announcement";
import Question from "./page/menu/Question";
import Inquiry from "./page/menu/Inquiry";
import Event from "./page/menu/Event";
import { TourList } from "./page/tour/TourList";
import { TourDetail } from "./page/tour/TourDetail";
import Schedule from "./page/menu/Schedule";
import { BoardDetail } from "./page/board/BoardDetail";
import { MyPage } from "./page/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "write", element: <BoardWrite /> },
      { path: "board/list", element: <BoardList /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "board/edit/:id", element: <BoardEdit /> },
      { path: "board/:id", element: <BoardDetail /> },
      { path: "login", element: <MemberLogin /> },
      { path: "member/list", element: <MemberList /> },
      { path: "signup", element: <MemberSignup /> },
      { path: "tour", element: <TourSearch /> },
      { path: "tour/list", element: <TourList /> },
      { path: "tour/:id", element: <TourDetail /> },
      { path: "announcement", element: <Announcement /> },
      { path: "question", element: <Question /> },
      { path: "inquiry", element: <Inquiry /> },
      { path: "event", element: <Event /> },
      { path: "schedule", element: <Schedule /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </ChakraProvider>
  );
}

export default App;
