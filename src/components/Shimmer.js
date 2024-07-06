import React from 'react';
import './Shimmer.css';
const Shimmer = () => {
    const shimmerCards = [];
    for (let i = 0; i < 30; i++) {
        shimmerCards.push(
            <div key={i} className="shimmer-cards"></div>
        );
    }
    return (
        <div className="shimmer-container">
            {shimmerCards}
        </div>
    );
};
export default Shimmer;
