import { Routes, Route, Navigate } from "react-router-dom";

// Importing All Pages.
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { useAuthContext } from "./shared/context/Auth-Context";
import { useEffect } from "react";

let logoutTimer;

function App() {
  const { isLoggedIn, login, logout, tokenExpirationDate, token } =
    useAuthContext();

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    if (
      storeData &&
      storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(storeData.userId, storeData.token, new Date(storeData.expiration));
    }
  }, [login]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        {/* Redirect to / */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        {/* Redirection... to /auth */}
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <main>
      <MainNavigation />
      {routes}
    </main>
  );
}

export default App;
