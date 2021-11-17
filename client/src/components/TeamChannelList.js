/** @format */

import React from "react";
import { AddChannel } from "../assets/AddChannel";
const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
}) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }
  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          {type === "team" ? "Channels" : "Messages"} Loading...
        </p>
      </div>
    );
  }
  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <div className="team-channel-list__header__title">
          <p>{type === "team" ? "Channels" : "Messages"}</p>
          <AddChannel
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
            type={type === "team" ? "team" : "messaging"}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default TeamChannelList;
