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
                const engagementA = a.likes * 0.5 + a.shares * 0.3 + a.comments * 0.2;
                const engagementB = b.likes * 0.5 + b.shares * 0.3 + b.comments * 0.2;

                // 2. Freshness (recent content gets a boost)
                const freshnessA = (Date.now() - new Date(a.timestamp)) / (1000 * 3600 * 24); // Days since posted
                const freshnessB = (Date.now() - new Date(b.timestamp)) / (1000 * 3600 * 24);

                // 3. User preferences (e.g., hashtags they follow)
                // const relevanceA = a.hashtags.some(tag => userPreferences.hashtags.includes(tag)) ? 1 : 0;
                // const relevanceB = b.hashtags.some(tag => userPreferences.hashtags.includes(tag)) ? 1 : 0;

                // Final score
                const scoreA = engagementA * 0.6 - freshnessA * 0.3
                const scoreB = engagementB * 0.6 - freshnessB * 0.3
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
    const trackEngagement = (reelId, action) => {
        // Send to backend (or update local state)
        console.log(`User ${action} reel ${reelId}`);
        // Example: Increase likes locally
        setSortedReels(prev => prev.map(reel =>
            reel.id === reelId ? { ...reel, likes: reel.likes + 1 } : reel
        ));
    };

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
                <button onClick={() => trackEngagement(sortedReels[currentIndex].id, 'like')}>
                    ❤️ {sortedReels[currentIndex]?.likes}
                </button>
            </div>
        </div>
    );
};

export default Reels;