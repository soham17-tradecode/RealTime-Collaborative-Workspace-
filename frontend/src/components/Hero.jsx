import "./Hero.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import RegisterModal from "./RegisterModal";

// import Dashboard from "../pages/Dashboard";



function Hero({ user }) {
    const [register, getRegister] = useState(false)
    const navigate = useNavigate();

    const handleCliclk = () => {
        if (user) {
             console.log("Hero User =", user);
            navigate("/dashboard");

        }
        else{
            getRegister(true);
        }


    }


    return (
        <>

            <section className="hero">

                <h1>

                    Real-Time Collaborative
                    Workspace

                </h1>

                <p >
                    Create rooms, share files, edit documents together,
                    and communicate instantly with your team from anywhere.
                </p>

                <button className="hero-btn" onClick={handleCliclk}>
                    Start Collaborating
                </button>
                {
                    register && (

                        <RegisterModal
                            onClose={() =>
                                getRegister(false)
                            }
                        />

                    )
                }

            </section>


        </>
    );
}

export default Hero;