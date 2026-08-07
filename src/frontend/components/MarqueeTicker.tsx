import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    "UX/UI DESIGNER",
    "FRONTEND DEVELOPER",
    "INTERACTIVE EXPERIENCES",
    "ETH CHIANG MAI HACKATHON",
    "CREATIVE DIRECTION",
    "PROTOTYPING & SYSTEM DESIGN",
    "WEB3 & BLOCKCHAIN UI"
  ]
}) => {
  // Duplicate items array to make infinite smooth scrolling
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-content">
        {marqueeItems.map((item, index) => (
          <div className="marquee-item" key={index}>
            <span>{item}</span>
            <span className="marquee-bullet" />
          </div>
        ))}
      </div>
    </div>
  );
};
