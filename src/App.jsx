
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <SkeletonTheme baseColor="#f1f5f9" highlightColor="#ffffff">
            <div className="space-y-4">
              <Skeleton height={60} className="rounded-xl" />
              <Skeleton height={40} className="rounded-lg" />
              <Skeleton height={40} className="rounded-lg" />
              <Skeleton height={80} className="rounded-xl" />
            </div>
          </SkeletonTheme>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="top-right"
        components={{
          Toast: ({ children, ...props }) => (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
              {children}
            </div>
          )
        }}
      >
        <AppNavigation />
      </ToastProvider>
    </div>
  );
}

export default App;
