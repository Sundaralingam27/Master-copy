import React from 'react';
import { TrophyOutlined, StarOutlined, GiftOutlined } from '@ant-design/icons';

const GamificationComponent = () => {
  return (
    <div className="gamification-container">
      <style>{`
        .gamification-container {
          padding: 20px;
          background-color: #f0f2f5;
          border-radius: 8px;
        }

        .badge-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .badge-item {
          display: flex;
          justify-content: center;
        }

        .tooltip {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .tooltip .tooltiptext {
          visibility: hidden;
          width: 120px;
          background-color: #555;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }

        .badge-icon {
          font-size: 36px;
          color:red;
        }
      `}</style>
      <div className="badge-container">
        <div className="badge-item">
          <div className="tooltip">
            <TrophyOutlined className="badge-icon" style={{ fontSize: '64px', color: '#ff8c00' }} />
            <span className="tooltiptext">Top Performer</span>
          </div>
        </div>
        <div className="badge-item">
          <div className="tooltip">
            <StarOutlined className="badge-icon"style={{ fontSize: '64px', color: '#ff8c00' }} />
            <span className="tooltiptext">Best Man</span>
          </div>
        </div>
        <div className="badge-item">
          <div className="tooltip">
            <GiftOutlined className="badge-icon" style={{ fontSize: '64px', color: '#ff8c00' }} />
            <span className="tooltiptext">Won First Prize</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default GamificationComponent;
