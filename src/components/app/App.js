import { lazy, Suspense } from "react";
import Spiner from "../spiner/Spiner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() =>
  import("../pages/singleComicPage/SingleComicPage")
);
const SingleCharacterLayout = lazy(() =>
  import("../pages/singleCharPage/SingleCharacterLayout")
);

const App = (props) => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spiner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
              <Route
                path="/characters/:charId"
                element={<SingleCharacterLayout />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
