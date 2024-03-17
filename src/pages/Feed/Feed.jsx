import React from "react";
import "./Feed.css";
import feedData from "../../data/feed.json";
import { IoStatsChart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export const Feed = ({ tracks }) => {
  const [feedPosts, setFeedPosts] = React.useState(
    feedData.map((feed) => ({ ...feed, isLiked: false }))
  );
  const navigate = useNavigate();
  const trendingSearches = [
    "hip hop",
    "rap",
    "kanye",
    "1nonly",
    "drake",
    "drill type beat",
    "lil baby",
    "1970s",
    "electronic",
    "crystal",
    "visions",
    "future",
    "synth",
    "pop",
    "city",
    "heartbeat",
    "love",
    "beat",
  ];

  const handleTrendingSearchClick = (event) => {
    navigate(`/trackSearch/${event.target.innerHTML}`);
  };

  const displayedTrendingSearches = trendingSearches.map((search) => {
    return (
      <div className="trendingSearch" onClick={handleTrendingSearchClick}>
        {search}
      </div>
    );
  });

  const displayedPopularTracks = [...tracks]
    .sort((a, b) => b.popularity_score - a.popularity_score)
    .slice(0, 5)
    .map((track, index) => {
      return (
        <Link to={`/tracks/${track.title}`}>
          <div className="popularTackOuter">
            <div className="popularTrack">
              <p>{track.title}</p>
              <p>{track.artist}</p>
            </div>
            <div className="position">#{index + 1}</div>
          </div>
        </Link>
      );
    });

  const displayedFeed = feedPosts.map((feed, index) => {
    return (
      <div className="feedPost">
        <div className="feedHeader">
          <h2 className="feedHead">{feed.title}</h2>
        </div>
        <div className="feedBody">{feed.body}</div>
        <div className="feedFooter">
          <div className="feedFoot">
            <p className="feedAuthor">By {feed.author}</p>
            <div className="feedStats">
              <p
                className="feedStat"
                onClick={() => handleLikeClick(feed.title)}
              >
                <div>
                  <FaHeart
                    style={{ color: feed.isLiked ? "red" : "var(--L2Grey)" }}
                  />{" "}
                </div>
                <span>{feed.likes}</span>
              </p>

              <p className="feedStat">
                <div>
                  <IoStatsChart className="viewIcon" />
                </div>
                <span> {feed.views}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const handleLikeClick = (postID) => {
    setFeedPosts(
      feedPosts.map((post) => {
        if (post.title === postID) {
          if (post.isLiked) {
            return { ...post, likes: post.likes - 1, isLiked: false };
          }
          return { ...post, likes: post.likes + 1, isLiked: true };
        }
        return post;
      })
    );
  };

  return (
    <div className="pageCont">
      <div className="innerPageCont">
        <div className="pageHeader">
          <h2 className="pageHead">Your Feed</h2>
        </div>
        <div className="feedContent">
          <div className="feedSide feedSideTrending">
            <h3 className="feedSideHead">Trending Searches</h3>
            <div className="trendingSearchesCont">
              {displayedTrendingSearches}
            </div>
          </div>
          <div className="feedMainContent">{displayedFeed}</div>
          <div className="feedSide feedSideArtist">
            <h3 className="feedSideHead">Popular Tracks</h3>
            <div className="popularTracksCont">{displayedPopularTracks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
