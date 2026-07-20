import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LanguageProvider from "./i18n/LanguageProvider";
import RouteFallback from "./components/layout/RouteFallback";
const Home = lazy(() => import("./components/Home/Home"));
const Users = lazy(() => import("./components/Users/Users"));
const Content = lazy(() => import("./components/Content/Content"));
const Placeholder = lazy(() => import("./components/layout/Placeholder"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/content" element={<Content />} />
            <Route
              path="/media"
              element={<Placeholder titleKey="nav.media" />}
            />
            <Route
              path="/settings"
              element={<Placeholder titleKey="nav.settings" />}
            />
            <Route
              path="/support"
              element={<Placeholder titleKey="nav.support" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
