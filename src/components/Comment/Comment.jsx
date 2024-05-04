import "./Comment.css";
import React, { Component } from "react";
import { FaThumbsUp } from "react-icons/fa";
import placeholderUser from "../../assests/images/placeholderUser.jpg";
import users from "../../data/users.json";

class Comment extends Component {
  render() {
    const { comment, handleCommentLike } = this.props;
    const user = users.find((user) => user.username === comment.username);
    const userImage = user ? user.user_image : placeholderUser;
    return (
      <div className="trackDetCommentOuter">
        <div className="trackDetComment">
          <img src={userImage} alt={`${comment.username}'s avatar`} />
          <div className="commentData">
            <div className="commentUser">{comment.username}</div>
            <div className="commentBody">{comment.commentBody}</div>
            <div className="commentMeta">
              <FaThumbsUp
                className="icon"
                style={{
                  color: comment.isLiked
                    ? "var(--primaryBlue)"
                    : "var(--L2Grey)",
                }}
                onClick={() => handleCommentLike(comment.commentBody)}
              />
              <span>{comment.likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
