import DetailTicket from "../pages/client/DetailTicket/DetailTicket";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Home from "../pages/client/Home/Home";
import ProfileHome from "@/pages/client/Profile/ProfileHome";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/detailTicket", component: DetailTicket, layout: DefaultLayout },
  { path: "/profile", component: ProfileHome, layout: DefaultLayout },
];

export default publicRoutes;
