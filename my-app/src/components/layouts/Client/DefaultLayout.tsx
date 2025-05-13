import Header from "./Header";
import Footer from "./Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;