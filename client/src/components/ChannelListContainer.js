/** @format */

import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import LogoutIcon from "../assets/logout.png";
const logo =
  "https://skillate-profile-pictures.s3.ap-south-1.amazonaws.com/org__156/590a6580-6d72-471b-9112-b7a620882687__logo.png";
const mini_logo =
  "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/b215a653-3512-4292-8dc9-546c3eae7c91.png?fit=max&w=104&auto=compress,format";

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={mini_logo} alt="mini logo" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner">
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">POSIST</p>
  </div>
);
const ChannelListContainer = () => {
  return (
    <>
      {/* Side bar where log out button and logo is placed */}
      <SideBar />
        
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
