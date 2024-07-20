import React from "react";

const GamificationComponent = (user) => {
  console.log(user, "user");
  return (
    <div className="gamification-container">
      <style>{`
        .gamification-container {
          padding: 20px;
          border-radius: 8px;
        }

        .badge-container {
          display: flex;
          gap: 30px;
          align-items:center;
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
          width:80px;
          height:80px;
        }
      `}</style>
      <div className="badge-container">
        {user.previewedUser && (
          <div className="badge-item">
            <div className="tooltip">
              <img
                src="../../../assets/images/trust.png"
                className="badge-icon"
              />
              <span className="tooltiptext">Verified Member</span>
            </div>
          </div>
        )}
        {user.previewedUser.posts?.length > 0 && (
          <div className="badge-item">
            <div className="tooltip">
              <img
                src="../../../assets/images/post.png"
                className="badge-icon"
              />
              <span className="tooltiptext">Tech Blogger</span>
            </div>
          </div>
        )}
        {user.previewedUser.comments?.length > 0 && (
          <div className="badge-item">
            <div className="tooltip">
              <img
                src="../../../assets/images/comment.png"
                className="badge-icon"
              />
              <span className="tooltiptext">Best Commentator</span>
            </div>
          </div>
        )}
        {user.previewedUser.followedTags?.length > 0 && (
          <div className="badge-item">
            <div className="tooltip">
              <img
                src="../../../assets/images/hashtag.png"
                className="badge-icon"
              />
              <span className="tooltiptext">Hashtag Aficionado</span>
            </div>
          </div>
        )}
        {user.previewedUser.following?.length > 0 && (
          <div className="badge-item">
            <div className="tooltip">
              <img
                src="../../../assets/images/followers.png"
                className="badge-icon"
              />
              <span className="tooltiptext">Network Builder</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationComponent;
