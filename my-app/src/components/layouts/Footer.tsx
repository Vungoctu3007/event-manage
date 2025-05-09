const Footer: React.FC = () => {
    return (
      <footer className="bg-purple-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            {/* Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-purple-600 hover:underline">
                About
              </a>
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-600 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-purple-600 hover:underline">
                Contact Us
              </a>
            </div>
  
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Follow us:</span>
              <a href="#" className="bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
                Facebook
              </a>
              <a href="#" className="bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
                Twitter
              </a>
              <a href="#" className="bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
                Instagram
              </a>
            </div>
          </div>
  
          {/* Sponsor Info */}
          <p className="text-center text-gray-500">© Sponsored and supported by Group 14</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;