import { useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate  } from "react-router-dom";
function Join_room({ onClose }) {

    const [roomCode, setRoomCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (roomCode == null) {
            setMessage("Room name is required");
            return;
        }
        try {


            setLoading(true);
            setMessage("");
            const response = await axios.post(
                "http://localhost:8080/joinRoom",
                {
                    roomCode: roomCode
                }, {
                withCredentials: true
            }
            );
            // const roomCode = response.data.roomCode;
            if (response.status === 200) {
                setMessage(response.data);

            }
            navigate(`/room/${roomCode}`);
            


            // setMessage(`Joined`);

            //optional 
            // setRoomName("");
        } catch (error) {

            console.error(error);
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage("Server not reachable");
            }

        } finally {
            setLoading(false);
        }


    };

    return (
        <div className="dashboard-container">

            <div className="dashboard-card">

                <h2>Join Room</h2>

                <form onSubmit={handleCreateRoom}>

                    <input
                        type="text"
                        placeholder="Enter room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        className="room-input"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="create-btn"
                    >
                        {loading ? "Joining..." : "Join Room"}


                    </button>

                </form>


                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Close
                </button>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}


            </div>

        </div>
    );

}
export default Join_room;

