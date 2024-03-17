import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TrackContext } from "../components/context/TrackContext/TrackContext";

export default function useSearch() {
  const { searchQuery, setSearchQuery } = useContext(TrackContext);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      navigate(`/tracks`);
    } else {
      navigate(`/trackSearch/${searchQuery}`);
    }
  };

  return {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
  };
}
