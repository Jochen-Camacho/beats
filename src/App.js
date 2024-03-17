import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import { Feed } from "./pages/Feed/Feed";
import { Tracks } from "./pages/Tracks/Tracks";
import { About } from "./pages/About/About";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Login/Register/Register";
import trackData from "./data/tacks.json";
import { TrackDetails } from "./pages/TrackDetails/TrackDetails";
import { TrackProvider } from "./components/context/TrackContext/TrackProvider";
import { AuthProvider } from "./hooks/useAuth";
import { Payment } from "./pages/Payment/Payment";
import { PaymentSuccess } from "./pages/Payment/PaymentSuccess/PaymentSuccess";

function App() {
  trackData.forEach((track) => console.log(track.comments));
  console.log(trackData.comments);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <TrackProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home tracks={trackData} />} />
                <Route path="/feed" element={<Feed tracks={trackData} />} />
                <Route path="/tracks" element={<Tracks tracks={trackData} />} />
                <Route
                  path="/tracks/:title"
                  element={<TrackDetails tracks={trackData} />}
                />
                <Route
                  path="/trackSearch/:searchQuery"
                  element={<Tracks tracks={trackData} />}
                />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </TrackProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
