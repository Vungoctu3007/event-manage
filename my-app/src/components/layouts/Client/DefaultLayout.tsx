import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="">
      <Header />
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
