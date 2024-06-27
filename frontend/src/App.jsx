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
import { MemberInfo } from "./page/member/MemberInfo.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";
import axios from "axios";
import { ItineraryDate } from "./page/itinerary/ItineraryDate.jsx";
import { ItineraryDetail } from "./page/itinerary/ItineraryDetail.jsx"; // axios interceptor 설정

// axios interceptor 설정
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
      { path: "member/:id", element: <MemberInfo /> },
      { path: "member/edit/:id", element: <MemberEdit /> },
      { path: "itinerary/date", element: <ItineraryDate /> },
      { path: "itinerary/detail", element: <ItineraryDetail /> },
    ],
  },
]);

function App() {
  return (
    <LoginProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </LoginProvider>
  );
}

export default App;
