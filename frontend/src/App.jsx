import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";


// import "./App.css";
// import Hero from "./components/Hero";
// import Navbar from "./components/Navbar";
import { useState, useEffect, use } from "react";
import Room from "./stomp/Room";
import { Routes, Route } from "react-router-dom";
import api from "./Api/axiosInstance"
function App() {

    const [user, setUser] = useState(null);
    useEffect(() => {

         api.post(
            "/me",
            // {
            //     method: "POST",
            //     credentials: "include"
            // }
        )
            .then(response => {
                setUser(
                    response.data.username
                );

                
            })
            
            .catch(() => {

                setUser(null);
            });

    }, []);






    return (

        <Routes>
            <Route
                path="/"
                element={<Home user={user} />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
            <Route
                path="/room/:roomCode"
                element={<Room />}
            />

            




        </Routes>
        // <div>
        //   <Chat />
        // </div>

    );
}

export default App;