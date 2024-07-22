import "./LeaderBoard.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("//localhost:5000/users/");
        if (res.data) {
          const sortedUsers = res.data
            .map((user) => ({
              ...user,
              badgeCount: [
                user?.posts?.length > 0,
                user?.comments?.length > 0,
                user?.followedTags?.length > 0,
                user?.following?.length > 0,
              ].filter(Boolean).length,
              points:
                [
                  user,
                  user?.posts?.length > 0,
                  user?.comments?.length > 0,
                  user?.followedTags?.length > 0,
                  user?.following?.length > 0,
                ].filter(Boolean).length * 10, 
            }))
            .sort((a, b) => b.badgeCount - a.badgeCount);

          setUsers(sortedUsers);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>LeaderBoard</h1>
      <div className="table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>POSITION</th>
              <th>USER</th>
              <th>ACHIEVEMENT BADGES</th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="rank">
                  <h1>{index + 1}</h1>
                </td>
                <td className="user-info">
                  <img
                    src={user.picture?.url}
                    alt={`${user.name}'s profile`}
                    className="profile-pic"
                  />
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-username">@{user.username}</div>
                  </div>
                </td>
                <td>
                  <div className="badge-container">
                    <div className="badge-item">
                      <div className="tooltip">
                        <img
                          src="/assets/images/trust.png"
                          className="badge-icon"
                          alt="Verified Member"
                        />
                        <span className="tooltiptext">Verified Member</span>
                      </div>
                    </div>
                    {user.posts?.length > 0 && (
                      <div className="badge-item">
                        <div className="tooltip">
                          <img
                            src="/assets/images/post.png"
                            className="badge-icon"
                            alt="Tech Blogger"
                          />
                          <span className="tooltiptext">Tech Blogger</span>
                        </div>
                      </div>
                    )}
                    {user.comments?.length > 0 && (
                      <div className="badge-item">
                        <div className="tooltip">
                          <img
                            src="/assets/images/comment.png"
                            className="badge-icon"
                            alt="Best Commentator"
                          />
                          <span className="tooltiptext">Best Commentator</span>
                        </div>
                      </div>
                    )}
                    {user.followedTags?.length > 0 && (
                      <div className="badge-item">
                        <div className="tooltip">
                          <img
                            src="/assets/images/hashtag.png"
                            className="badge-icon"
                            alt="Hashtag Aficionado"
                          />
                          <span className="tooltiptext">
                            Hashtag Aficionado
                          </span>
                        </div>
                      </div>
                    )}
                    {user.following?.length > 0 && (
                      <div className="badge-item">
                        <div className="tooltip">
                          <img
                            src="/assets/images/followers.png"
                            className="badge-icon"
                            alt="Network Builder"
                          />
                          <span className="tooltiptext">Network Builder</span>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="points">
                  <h1>{user.points}</h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
