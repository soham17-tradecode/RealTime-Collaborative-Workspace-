import { use, useState } from "react";
import "./Model.css";

function RegisterModal({ onClose }) {

    const [name,setName] =
        useState("");

    const [email,setEmail] =
        useState("");

    const [password,setPassword] =
        useState("");

    const [cpassword,setCpassword] =
        useState("");

    const [message,setMessage] =
        useState("");

    // const [message1 ,setMessage1] = useState("");

    const register = async (e) => {

        e.preventDefault();

        try {

            const response =
                await fetch(
                    "http://localhost:8080/save",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password,
                            cpassword
                        })
                    }
                );

            const data =
                await response.text();

            if(response.ok){

               setMessage("Registration success");
            //    alert("SFSS");

                // onClose();



            } else {

                setMessage("data");
            }

        } catch(error){

            console.error(error);

            setMessage(
                "Registration Failed"
            );
        }
    };

    return (

        <div className="modal">

            <div className="modal-content">

                <h2>
                    Register
                </h2>

                <form onSubmit={register}>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        required
                        onChange={(e)=>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e)=>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e)=>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={cpassword}
                        required
                        onChange={(e)=>
                            setCpassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                        className="modal-btn"
                    >
                        Register
                    </button>

                </form>
                {/* <p>{message1}</p> */}

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Close
                </button>

                <p className="message1">
                    {message}
                </p>

            </div>

        </div>
    );
}

export default RegisterModal;