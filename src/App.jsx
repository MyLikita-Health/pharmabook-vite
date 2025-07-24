/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import "./assets/styles/main.css";
import AppNavigation from "./components/routes/AppNavigation";

import { initUser } from "./redux/action/auth";

// import Index from "./pages/pharmacy/drugRequest/Index";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIsReady, setPageIsReady] = useState(false);

  const navigateUser = useCallback(() => {
    dispatch(
      initUser(
        () => {
          // setPageIsReady(true);
          navigate(`${location.pathname}${location.search}`);
        },
        () => {
          // setPageIsReady(true);
          navigate("/app/login");
        }
      )
    );
  }, []);

  useEffect(() => {
    navigateUser();
  }, [navigateUser]);

  if (pageIsReady)
    return (
      <SkeletonTheme baseColor="red" highlightColor="#fff">
        <Skeleton count={4} />
      </SkeletonTheme>
    );

  return (
    <>
      <ToastProvider>
        <AppNavigation />
      </ToastProvider>
    </>
  );
}

export default App;
