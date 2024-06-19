import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import Announcement from "./page/menu/Announcement.jsx";
import Question from "./page/menu/Question.jsx";
import Inquiry from "./page/menu/Inquiry.jsx";
import Event from "./page/menu/Event.jsx";
import { TourList } from "./page/tour/TourList.jsx";
import { TourDetail } from "./page/tour/TourDetail.jsx"; // import Schedule from "./page/menu/Schedule.jsx";
import Schedule from "./page/menu/Schedule.jsx";
import { BoardDetail } from "./page/board/BoardDetail.jsx";

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
      {
        index: true,
        element: <Home />,
      },
      { path: "/write", element: <BoardWrite /> },
      { path: "board/list", element: <BoardList /> },
      { path: "board/edit/:id", element: <BoardEdit /> },
      { path: "board/:id", element: <BoardDetail /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "login", element: <MemberLogin /> },
      { path: "member/list", element: <MemberList /> },
      { path: "signup", element: <MemberSignup /> },
      { path: "tour", element: <TourSearch /> },
      { path: "tour/list", element: <TourList /> },
      { path: "tour/list/:id", element: <TourDetail /> },
      { path: "announcement", element: <Announcement /> },
      { path: "question", element: <Question /> },
      { path: "inquiry", element: <Inquiry /> },
      { path: "event", element: <Event /> },
      { path: "schedule", element: <Schedule /> },
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
