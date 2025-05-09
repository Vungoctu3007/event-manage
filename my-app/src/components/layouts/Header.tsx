import { Link } from "react-router-dom";
import avatarImage from "../../assets/avatar.jpg";
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">

      <div className="flex items-center space-x-4">
        <span className="text-gray-500 font-medium">Group 14</span>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-purple-600 font-medium">
            Events
          </Link>
          <Link to="/my-tickets" className="text-gray-700 hover:text-purple-600 font-medium">
            My Tickets
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Create Event
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
          <img
            src={avatarImage}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;