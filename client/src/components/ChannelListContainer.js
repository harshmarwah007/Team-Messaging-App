/** @format */

import React, { useState } from "react";
import { ChannelList, useChatContext, Avatar } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import LogoutIcon from "../assets/logout.png";

const cookies = new Cookies();
const SideBar = ({ logout, setIsDashboard }) => {
  const { client } = useChatContext();
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <Avatar
            
            onClick={() => setIsDashboard(true)}
            image={client.user.image}
            name={client.user.fullName || client.user.id}
            size={44}
          />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">POSIST</p>
  </div>
);
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleContainer,
  setIsDashboard,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("emailId");
    cookies.remove("region");
    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      {/* Side bar where log out button and logo is placed */}
      <SideBar logout={logout} setIsDashboard={setIsDashboard} />

      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
              setIsDashboard={setIsDashboard}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              setToggleContainer={setToggleContainer}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setIsDashboard={setIsDashboard}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
              setIsDashboard={setIsDashboard}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              type="messaging"
              setToggleContainer={setToggleContainer}
              setIsDashboard={setIsDashboard}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
  setIsDashboard,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setIsDashboard={setIsDashboard}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-87%",
          backgroundColor: "#005fff",
        }}>
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
          setIsDashboard={setIsDashboard}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
