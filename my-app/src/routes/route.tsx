import DetailTicket from "../pages/client/DetailTicket/DetailTicket";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Home from "../pages/client/Home/Home";
import ProfileHome from "@/pages/client/Profile/ProfileHome";
import SeatingChart from "@/pages/client/DetailTicket/SeatingTicket";

const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/detailTicket", component: DetailTicket, layout: DefaultLayout },
    { path: "/profile", component: ProfileHome, layout: DefaultLayout },
    { path: "/test", component: SeatingChart, layout: DefaultLayout },
];

export default publicRoutes;
