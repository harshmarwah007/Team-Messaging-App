/** @format */

import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { SearchIcon } from "../assets/SearchIcon";
const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async(text) => {
    try {
      //TODO:
    } catch (error) {
      setQuery("");
    }
  };
  const onSearch = (event) => {
    event.preventdefault();
    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };
  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          type="text"
          value={query}
          onChange={onSearch}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
