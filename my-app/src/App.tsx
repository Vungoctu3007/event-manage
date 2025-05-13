import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/route";
import DefaultLayout from "./components/layouts/Client/DefaultLayout";
function App() {
  useEffect(() => {
    document.title = "Event Manage !";
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.layout !== undefined ? route.layout : DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  Layout === null ? (
                    <Page />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App
