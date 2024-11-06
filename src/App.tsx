import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./App.css";

import { AppProvider } from "./provider/AppProvider";
import Logo from "./components/Logo";
import Quest from "./pages/Quest";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/Footer";

function App() {
  const [searchParams] = useSearchParams();
  const userQueryParam = searchParams.get("user");

  if (userQueryParam) {
    localStorage.setItem("userid", userQueryParam);
  }

  return (
    <div className="App-header space-y-6">
      <AppProvider>
        <Logo />
        <Routes>
          <Route path="/" element={<Quest />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/rank" element={<Leaderboard />}></Route>
        </Routes>
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
