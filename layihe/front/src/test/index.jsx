import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import axios from "axios";
import "./index.scss"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaComment, FaRegComment } from "react-icons/fa";
import { AuthContext } from '../components/authContext';
import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Reels = () => {
    const [reels, setReels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedReels, setSortedReels] = useState([]);
    const { user } = useContext(AuthContext);
    // const [get, setGet] = useState([]);
    const [fav, setFav] = useState([])
    const [sav, setSav] = useState([])
    const [use, setUse] = useState([])
    const [all, setAll] = useState([])
    const [textt, setText] = useState("")
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);







    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user`);
                setAll(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);


    useEffect(() => {
        if (user && user?._id) {
            getDataa();
        }
    }, [user]);




    const getDataa = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/user/find/${user?._id}`);
            // setGet(res.data);

            // Assuming 'res.data.favorites' contains the list of favorite reel IDs
            setFav(res.data.favorites || []);
            setSav(res.data.saved || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getuse = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/user`);
            setUse(res.data);


            // Assuming 'res.data.favorites' contains the list of favorite reel IDs
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getuse();
        };

        fetchData();
    }, []);

    const owner = use.find((q) => q?._id === sortedReels[currentIndex]?.creator)

    // console.log(use);





    // Fetch reels data
    useEffect(() => {
        // Declare the async function inside useEffect
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/reels");
                setReels(res.data.data);

                const commentsData = {};

                res.data.data.forEach((reel) => {
                    commentsData[reel._id] = reel.comments || [];
                });

                setComments(commentsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);




    // Sort reels into least-watched, mid-tier, and most-watched
    useEffect(() => {
        if (reels.length > 0) {
            const sortedByViews = [...reels].sort((a, b) => a.views - b.views);

            const shuffle = (array) => array.sort(() => Math.random() - 0.5);

            const leastWatched = shuffle(sortedByViews.slice(0, 3));
            const midWatched = shuffle(sortedByViews.slice(3, 18));
            const mostWatched = shuffle(sortedByViews.slice(18, 28));

            const selectedReels = [...leastWatched, ...midWatched, ...mostWatched];

            const sorted = selectedReels.sort((a, b) => {
                const engagementA = a.likes * 0.5 + a.shares * 0.3 + a.comments * 0.2;
                const engagementB = b.likes * 0.5 + b.shares * 0.3 + b.comments * 0.2;

                const freshnessA = (Date.now() - new Date(a.timestamp)) / (1000 * 3600 * 24);
                const freshnessB = (Date.now() - new Date(b.timestamp)) / (1000 * 3600 * 24);

                const scoreA = engagementA * 0.6 - freshnessA * 0.3;
                const scoreB = engagementB * 0.6 - freshnessB * 0.3;
                return scoreB - scoreA;
            });

            setSortedReels(sorted);
        }
    }, [reels]);


    // Handle swipe gestures
    const handleSwipe = (direction) => {
        if (direction === 'up' && currentIndex < sortedReels.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (direction === 'down' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => handleSwipe('up'),
        onSwipedDown: () => handleSwipe('down'),
        trackMouse: true,
    });

    const trackEngagement = (reelId, action) => {
        console.log(`User ${action} reel ${reelId}`);
        setSortedReels(prev => prev.map(reel =>
            reel.id === reelId ? { ...reel, likes: reel.likes + 1 } : reel
        ));
    };




    const handleFav = async () => {
        try {
            const reelId = sortedReels[currentIndex]?._id;
            const userId = user?._id;

            if (!reelId || !userId) {
                console.error("Missing reelId or userId");
                return;
            }

            const isFavorite = fav?.includes(reelId);



            // Optimistically update the UI
            setFav((prevFav) =>
                isFavorite ? prevFav.filter((id) => id !== reelId) : [...prevFav, reelId]
            );

            if (isFavorite) {
                // Remove from favorites
                await axios.post("http://localhost:8080/api/user/reel/del", { reelId, userId });
                await axios.post("http://localhost:8080/api/reels/unlike", { userId, reelId })

            } else {
                // Add to favorites
                await axios.post("http://localhost:8080/api/user/reel/add", { reelId, userId });
                await axios.post("http://localhost:8080/api/reels/like", { userId, reelId })
            }
        } catch (error) {
            console.error("Error handling favorite action:", error);
        }
    };

    const handleSave = async () => {
        try {
            const reelId = sortedReels[currentIndex]?._id;
            const userId = user?._id;

            if (!reelId || !userId) {
                console.error("Missing reelId or userId");
                return;
            }

            const isSaved = sav?.includes(reelId);

            // Optimistically update the UI
            setSav((prevSav) =>
                isSaved ? prevSav.filter((id) => id !== reelId) : [...prevSav, reelId]
            );

            if (isSaved) {
                // Remove from favorites
                await axios.post("http://localhost:8080/api/user/reel/sdel", { reelId, userId });
            } else {
                // Add to favorites
                await axios.post("http://localhost:8080/api/user/reel/save", { reelId, userId });
            }
        } catch (error) {
            console.error("Error handling favorite action:", error);
        }
    };

    const addComment = async () => {
        try {
            const reelId = sortedReels[currentIndex]?._id;
    
            if (!reelId || !textt.trim()) {
                return;
            }
    
            const response = await axios.post("http://localhost:8080/api/reels/addComment", {
                reelId,
                userId: user?._id,
                text: textt
            });
    
            const newComment = response.data; // Get the added comment from backend
    
            // Update the comments state properly
            setComments(prevComments => ({
                ...prevComments,
                [reelId]: [...(prevComments[reelId] || []), newComment]
            }));
    
            setText(""); // Clear input field after posting
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    














    return (
        <div className="App" {...swipeHandlers}>
            <div className="container">
                <div className='all'>

                    <div className='vid'>
                        <video
                            className='reel'
                            src={sortedReels[currentIndex]?.videoUrl}
                            autoPlay
                            muted
                            controls
                        />


                    </div>
                    <div className='actions'>
                        <button onClick={handleFav} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}>
                            {fav?.some((q) => q === sortedReels[currentIndex]?._id) ? <FaHeart /> : <FaRegHeart />}

                            {sortedReels[currentIndex]?.likers.length}
                        </button>
                        <button onClick={handleSave}>
                            {sav?.some((q) => q === sortedReels[currentIndex]?._id) ? <BsFillSaveFill /> : <BsSave />}

                        </button>
                        <button
                            onClick={() => setShowComments(!showComments)}
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}
                        >
                            {showComments ? <FaComment /> : <FaRegComment />}
                        </button>

                    </div>
                    <div className='user'>
                        <img src={owner?.image} alt="" />
                        <p>{owner?.name}</p>
                    </div>
                    <div className='context'>
                        <p>{sortedReels[currentIndex]?.context}</p>
                    </div>


                    {showComments && (
                        <div className="comments-container">
                            <div className="comments-list">
                                {comments[sortedReels[currentIndex]?._id]?.length > 0 ? (
                                    comments[sortedReels[currentIndex]?._id].map((comment, index) => {
                                        const commentUser = all?.find(user => user._id === comment.user);
                                        return (

                                            <div key={index} className="comment">
                                                <img src={commentUser?.image} alt="" className="comment-avatar" />
                                                <span>{commentUser?.name}</span>
                                                <p>{comment?.text}</p> {/* Fix the field name */}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>No comments yet</p>
                                )}
                            </div>
                            <div className="comment-input">
                                <input
                                    type="text"
                                    value={textt}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                                <button onClick={addComment} disabled={!textt.trim()}>Post</button>
                            </div>
                        </div>
                    )}


                    <Link to="/saved">SAVED</Link>
                </div>


            </div>
        </div>
    );
};

export default Reels;
