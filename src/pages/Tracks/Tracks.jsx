import React from "react";
import "./Tracks.css";
import { ImBullhorn } from "react-icons/im";
import { FaChartSimple, FaMusic } from "react-icons/fa6";
import { TbCircleLetterF } from "react-icons/tb";
import { FaRecordVinyl } from "react-icons/fa";
// import { IoGridOutline } from "react-icons/io5";
// import { FaBars } from "react-icons/fa";
import { Track } from "../../components/Track/Track";
import { useNavigate, useParams } from "react-router-dom";
import { TrackContext } from "../../components/context/TrackContext/TrackContext";

export const Tracks = ({ tracks }) => {
  const [filteredTracks, setFilteredTracks] = React.useState([]);
  const { setPriceFilter } = React.useContext(TrackContext);
  const { searchQuery } = useParams();
  const [filterOptions, setFilterOptions] = React.useState({
    priceFilter: "Monthly",
    genreFilter: "All",
    sortFilter: "Top",
  });
  const navigvate = useNavigate();
  const onSelectFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  React.useEffect(() => {
    let resultTracks = [...tracks];

    if (searchQuery) {
      const searchLowerCase = searchQuery.toLowerCase();
      resultTracks = resultTracks.filter(
        (track) =>
          track.title.toLowerCase().includes(searchLowerCase) ||
          track.artist.toLowerCase().includes(searchLowerCase) ||
          track.tags.some((tag) =>
            tag.toLowerCase().includes(searchLowerCase)
          ) ||
          track.genre.toLowerCase().includes(searchLowerCase)
      );
    }

    if (filterOptions.genreFilter !== "All") {
      resultTracks = resultTracks.filter(
        (track) =>
          track.genre.toLowerCase() === filterOptions.genreFilter.toLowerCase()
      );
    }

    setPriceFilter(filterOptions.priceFilter);
    setFilteredTracks(resultTracks);
  }, [
    tracks,
    searchQuery,
    filterOptions.genreFilter,
    filterOptions.priceFilter,
    setPriceFilter,
  ]);

  const navItems = [
    {
      navName: "New",
      navIcon: <ImBullhorn />,
      filter: () =>
        setFilteredTracks(
          [...tracks].sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          )
        ),
    },
    {
      navName: "Trending",
      navIcon: <FaChartSimple />,
      filter: () => setFilteredTracks(tracks.filter((track) => track.trending)),
    },
    {
      navName: "Free Beats",
      navIcon: <TbCircleLetterF />,
      filter: () => setFilteredTracks(tracks.filter((track) => track.free)),
    },
    {
      navName: "Top Beats",
      navIcon: <FaMusic />,
      filter: () =>
        setFilteredTracks(
          [...tracks].sort((a, b) => b.popularity_score - a.popularity_score)
        ),
    },
    {
      navName: "All",
      navIcon: <FaRecordVinyl />,
      filter: () => setFilteredTracks(tracks),
    },
  ];

  const handleFilterClick = (filterFunction, event) => {
    navigvate("/tracks");
    filterFunction();

    const allNavItems = document.querySelectorAll(".trackNavItem");

    allNavItems.forEach((item) => {
      item.classList.remove("clickedElement");
    });
    const parentNavItem = event.target.closest(".trackNavItem");
    if (parentNavItem) {
      parentNavItem.classList.add("clickedElement");
    }
  };

  const displayNavItems = navItems.map((navItem) => {
    return (
      <div
        className="trackNavItem"
        onClick={(event) => handleFilterClick(navItem.filter, event)}
      >
        <div className="trackNavItemImage">
          <div className="trackNavItemIcon">{navItem.navIcon}</div>
        </div>
        <p className="trackNavItemName">{navItem.navName}</p>
      </div>
    );
  });

  const tracksDisplay = filteredTracks.map((track) => (
    <Track key={track.id} track={track} />
  ));

  const uniqueGenres = Array.from(new Set(tracks.map((track) => track.genre)));

  const genreOptions = uniqueGenres.map((genre) => (
    <option key={genre}>{genre}</option>
  ));

  return (
    <div className="pageCont">
      <div className="innerPageCont">
        <div className="pageHeader">
          <h2 className="pageHead">Explore Tracks</h2>
        </div>
        <div className="tracksPageCont">
          <div className="tracksNav">{displayNavItems}</div>
          <div className="tracksDisplay">
            <div className="tracksFilter">
              <div className="tracksFilterStart">
                <div className="tracksFilterSort">
                  Genre
                  <select
                    name="genreFilter"
                    value={filterOptions.genreFilter}
                    onChange={onSelectFilterChange}
                  >
                    <option>All</option>
                    {genreOptions}
                  </select>
                </div>
                <div className="tracksFilterSort">
                  Price:
                  <select
                    name="priceFilter"
                    value={filterOptions.priceFilter}
                    onChange={onSelectFilterChange}
                  >
                    <option>Monthly</option>
                    <option>Exclusive</option>
                  </select>
                </div>
              </div>
              {/* <div className="tracksFilterEnd">
                <div className="tracksDisplayOptions">
                  <FaBars className="tracksDisplayIcon icon" />
                  <div> | </div>
                  <IoGridOutline className="tracksDisplayIcon icon" />
                </div>
              </div> */}
            </div>
            {tracksDisplay.length === 0 ? (
              <h2 className="noSearchMsg">No Beat Found for "{searchQuery}"</h2>
            ) : (
              <div className="tracksDisplayList">{tracksDisplay} </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
