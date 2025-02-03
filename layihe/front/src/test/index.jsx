import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import axios from "axios";

const Reels = () => {
    const [reels, setReels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedReels, setSortedReels] = useState([]);

    // Fetch reels data
    const getData = async () => {
        try {
            const res = await axios("http://localhost:8080/api/reels");
            setReels(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        getData();
    }, []);

    // Sort reels whenever `reels` changes
    useEffect(() => {
        if (reels.length > 0) {
            const sorted = [...reels].sort((a, b) => {
                const scoreA = a.likes * 0.6 + a.shares * 0.3 - (new Date() - new Date(a.timestamp)) / 100000;
                const scoreB = b.likes * 0.6 + b.shares * 0.3 - (new Date() - new Date(b.timestamp)) / 100000;
                return scoreB - scoreA;
            });
            setSortedReels(sorted);
        }
    }, [reels]); // Only run when `reels` changes

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

    return (
        <div className="App" {...swipeHandlers}>
            <div className="reel-container">
                <video
                    src={sortedReels[currentIndex]?.videoUrl}
                    autoPlay
                    muted
                    controls
                    style={{ width: '100%', height: '100vh' }}
                />
                {/* <div className="reel-controls">
                    <button onClick={() => handleSwipe('up')}>⬆️ Next Reel</button>
                    <button onClick={() => handleSwipe('down')}>⬇️ Previous Reel</button>
                </div> */}
            </div>
        </div>
    );
};

export default Reels;