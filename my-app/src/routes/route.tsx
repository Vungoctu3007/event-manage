import DetailTicket from "../pages/client/DetailTicket/DetailTicket";
import DefaultLayout from "../components/layouts/Client/DefaultLayout";
import Home from "../pages/client/Home/Home";
import ProfileHome from "@/pages/client/Profile/ProfileHome";
import SeatingChart from "@/pages/client/DetailTicket/SeatingTicket";
import OrganizerLayout from "@/components/layouts/Organizer/OrganizerLayout";
import EventHome from "@/pages/organizer/event";
import Report from "@/pages/organizer/report";
import CreateEvent from "@/pages/organizer/event/CreateEvent";
import SeatingMap from "@/pages/organizer/event/SeatingMap";
import SeatEditor from "@/pages/organizer/event/SeatEditor";

const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/detailTicket", component: DetailTicket, layout: DefaultLayout },
    { path: "/profile", component: ProfileHome, layout: DefaultLayout },
    { path: "/test", component: SeatingChart, layout: DefaultLayout },

    // Organizer routes
    { path: "/organizer/events", component: EventHome, layout: OrganizerLayout },
    { path: "/organizer/report", component: Report, layout: OrganizerLayout },
    { path: "/organizer/create-event", component: CreateEvent, layout: OrganizerLayout },

    // Seating Map
      { path: "/seating-map", component: SeatEditor, layout: OrganizerLayout },
];

export default publicRoutes;
