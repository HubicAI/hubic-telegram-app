import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./App.css";

import { AppProvider } from "./provider/AppProvider";
import Logo from "./components/Logo";
import Quest from "./pages/Quest";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import SpinWheel from "./pages/Spin";
import Footer from "./components/Footer";

function App() {
    const [searchParams] = useSearchParams();
    const userQueryParam = searchParams.get("user");

    if (userQueryParam) {
        localStorage.setItem("userid", userQueryParam);
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#000000] App">
            <AppProvider>
                <div className="flex flex-col items-center w-full max-w-[400px] min-h-screen">
                    <header className="w-full flex justify-center py-4">
                        <Logo />
                    </header>
                    <main className="flex-1 w-full overflow-y-auto px-4 py-6">
                        <Routes>
                            <Route path="/" element={<SpinWheel />} />
                            <Route path="/quest" element={<Quest />} />
                            <Route path="/rank" element={<Leaderboard />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                    <footer className="w-full shadow-inner">
                        <Footer />
                    </footer>
                </div>
            </AppProvider>
        </div>
    );
}

export default App;