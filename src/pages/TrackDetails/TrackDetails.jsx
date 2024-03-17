import React from "react";
import "./TrackDetails.css";
import { useParams } from "react-router-dom";
import { WaveForm } from "../../components/WaveForm/WaveForm";
import { IoCartOutline } from "react-icons/io5";
import comments from "../../data/comment.json";
import users from "../../data/users.json";
import { FaThumbsUp } from "react-icons/fa";
import placeholderUser from "../../assests/images/placeholderUser.jpg";
import { useAuth } from "../../hooks/useAuth";
import { Popup } from "../../components/Popup/Popup";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

export const TrackDetails = ({ tracks }) => {
  const [displayComments, setDisplayComments] = React.useState([]);
  const [commentData, setCommentData] = React.useState(
    comments.map((comment) => ({ ...comment, isLiked: false }))
  );
  const param = useParams();
  const selectedTrack = tracks.find((track) => track.title === param.title);
  const [commentContent, setCommentContent] = React.useState("");
  const { user } = useAuth();
  const [show, setShow] = React.useState(false);
  const [commentError, setCommentError] = React.useState(false);
  const { addItemToCart } = useCart();
  const [selectedPrice, setSelectedPrice] = React.useState("Monthly");

  React.useEffect(() => {
    const filteredComments = commentData
      .filter((comment) => comment.trackTitle === selectedTrack.title)
      .map((comment, index) => {
        const user = users.find((user) => user.username === comment.username);
        return (
          <div className="trackDetCommentOuter" key={index}>
            <div className="trackDetComment">
              <img src={user.user_image} alt={`${user.username}'s avatar`} />
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
      });
    setDisplayComments(filteredComments);
  }, [selectedTrack, commentData]);

  const handleCommentLike = (commentId) => {
    setCommentData(
      commentData.map((comment) => {
        if (comment.commentBody === commentId) {
          if (comment.isLiked) {
            return { ...comment, likes: comment.likes - 1, isLiked: false };
          } else {
            return { ...comment, likes: comment.likes + 1, isLiked: true };
          }
        }
        return comment;
      })
    );
  };

  const handlePostComment = (event) => {
    event.preventDefault();
    if (!user) {
      setShow(true);
    } else {
      if (commentContent.trim() === "") {
        setCommentError(true);
      } else {
        const newCommentJSX = (
          <div className="trackDetCommentOuter">
            <div className="trackDetComment">
              <img src={placeholderUser} alt="Placeholder" />
              <div className="commentData">
                <div className="commentUser">Test</div>
                <div className="commentBody">{commentContent}</div>
                <div className="commentMeta">
                  <FaThumbsUp className="icon" />
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        );
        setDisplayComments((prevComments) => [newCommentJSX, ...prevComments]);
        setCommentContent("");
        setCommentError(false);
      }
    }
  };

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handlePriceOptionClick = (event) => {
    setSelectedPrice(event.target.id);
    const allPriceOptions = document.querySelectorAll(".tractDetPurchOption");

    allPriceOptions.forEach((option) => {
      option.classList.remove("optionClicked");
    });

    const parentOption = event.target.closest(".tractDetPurchOption");
    if (parentOption) {
      parentOption.classList.add("optionClicked");
    }
  };

  const handleAddToCartClick = () => {
    if (user) {
      addItemToCart(selectedTrack, selectedPrice);
    } else {
      setShow(true);
    }
  };

  return (
    <div className="pageCont">
      <div className="innerPageCont">
        <div className="trackDetCont">
          <div className="trackDetContent">
            <div className="trackDetContentInner">
              <img src={selectedTrack.cover_image} alt={selectedTrack.title} />
              <div className="trackDetInfoCont">
                <div className="trackDetNameArtist">
                  <p className="trackDetName">{selectedTrack.title}</p>
                  <p className="trackDetArtist">{selectedTrack.artist}</p>
                </div>
                <div className="trackDetMetaData">
                  Published: <span>{selectedTrack.release_date}</span>
                </div>
              </div>
            </div>
            <div className="trackDetTagsCont">
              <h4>Tags: </h4>
              <div className="trackDetTags">
                {selectedTrack.tags.map((tag) => {
                  return (
                    <Link to={`/trackSearch/${tag}`}>
                      <div className="trendingSearch">{tag}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="trackDetSecondary">
            <div className="trackDetAudioPlayer">
              <WaveForm url={selectedTrack.audio} />
            </div>
            <div className="trackDetPurchase">
              <div className="trackDetPurchTop">
                <h2 className="trackDetPurchTitle">Purchase Options:</h2>
                <button className="btnPrimary" onClick={handleAddToCartClick}>
                  Add <IoCartOutline className="cart" />
                </button>
              </div>
              <div className="tractDetPurchOptions ">
                <div
                  className="tractDetPurchOption optionClicked"
                  id="Monthly"
                  onClick={handlePriceOptionClick}
                >
                  Montly <span>{selectedTrack.price.monthly}</span>
                </div>
                <div
                  className="tractDetPurchOption"
                  id="Exclusive"
                  onClick={handlePriceOptionClick}
                >
                  Exclusive <span>{selectedTrack.price.exclusive}</span>
                </div>
              </div>
            </div>
            <div className="trackDetCommentCont">
              <div className="trackDetCommentTop">
                <h2 className="trackDetCommentTitle">Comments</h2>
                <div className="trackDetComments">
                  <div className="trackDetAddCommentOuter">
                    <form
                      className="trackDetAddComment"
                      onSubmit={handlePostComment}
                    >
                      <img src={placeholderUser} />
                      <div className="addCommentCont">
                        <input
                          type="text"
                          placeholder="Share your thoughts..."
                          value={commentContent}
                          onChange={handleCommentContentChange}
                        ></input>
                        <div className="alignDiv">
                          {commentError && (
                            <p className="errorMsg">Comment is empty!</p>
                          )}
                          <button className="btnPrimary">Post</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {displayComments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        show={show}
        setShow={setShow}
        message={
          " To carry out this task you need to be logged in or have an account."
        }
      ></Popup>
    </div>
  );
};
