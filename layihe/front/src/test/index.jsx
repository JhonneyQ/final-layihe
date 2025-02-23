import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import axios from "axios";
import "./index.scss"

const Reels = () => {
    const [reels, setReels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedReels, setSortedReels] = useState([]);

    console.log(reels);


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

    return (
        <div className="App" {...swipeHandlers}>
            <div className="container">
                <div className='vid'>
                    <video
                        className='reel'
                        src={sortedReels[currentIndex]?.videoUrl}
                        autoPlay
                        muted
                        controls
                        style={{ width: '100%' }}
                    />
                    <button className='like'>

                    </button>
                    <button className='save'>

                    </button>
                </div>

            </div>
        </div>
    );
};

export default Reels;
