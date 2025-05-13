import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { AuthContext } from "../../components/authContext";
import axios from "axios";

const Saved = () => {
    const [fav, setFav] = useState([]);
    const [sav, setSav] = useState([]);
    const { user } = useContext(AuthContext);
    const [reels, setReels] = useState([]);

    useEffect(() => {
        if (user && user?._id) {
            getUserData();
        }
    }, [user]);

    const getUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/user/find/${user?._id}`);
            setFav(res.data.favorites || []);
            setSav(res.data.saved || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchReels();
    }, []);

    const fetchReels = async () => {
        try {
            const res = await axios("http://localhost:8080/api/reels");
            setReels(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredReels = reels.filter((q) => sav.includes(q?._id));

    return (
        <section className="saved">
            <div className="container">
                <h2>Your Saved Reels</h2>
                <div className="reel-grid">
                    {filteredReels.length > 0 ? (
                        filteredReels.map((q) => (
                            <div key={q._id} className="reel-card">
                                <video className="reel" src={q.videoUrl} muted controls />
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">No saved reels yet!</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Saved;
