import Kynes from "../../images/kynes.jpg";
import Baron from "../../images/baron_harkonnen.jpg";
import Chani from "../../images/chani.jpg";
import DukeLeto from "../../images/leto_atreides.jpg";
import LadyJessica from "../../images/lady_jessica.jpg";
import DuncanIdaho from "../../images/duncan_idaho.jpg";
import PaulAtreides from "../../images/paul_atreides.jpg";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
  Conversation,
  ConversationHeader,
  ConversationList,
  MainContainer,

  // Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import { useStores } from "../../data/store/RootStore.js";
import { PrimaryColor } from "../../constants/constants.js";
import { observer } from "mobx-react";
import { ChatRoom } from "../chat/ChatRoom.js";
import { Loader } from "../../components/Loader.js";
import { ChatConversations } from "../chat/ChatConversations.js";
import { toJS } from "mobx";
import { useEffect } from "react";
import { NoRoom } from "../../components/error/NoRoom.js";
import { AvatarGenerator } from "random-avatar-generator";

export const HomePage = observer(() => {
  const { sessionStore, roomStore, monitorStore, dataStore } = useStores();
  const _me = sessionStore._user;

  const room = roomStore.selectedRoom;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationHeader style={{ backgroundColor: PrimaryColor }}>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(dataStore.peerId)} name={_me} status="available" size="fluid" />
            <ConversationHeader.Content style={{ backgroundColor: PrimaryColor }} userName={_me}></ConversationHeader.Content>
          </ConversationHeader>

          {monitorStore.isMonitorReady() ? <ChatConversations></ChatConversations> : <Loader></Loader>}
        </Sidebar>
        {room ? <ChatRoom room={room}></ChatRoom> : <NoRoom></NoRoom>}
      </MainContainer>
    </div>
  );
});
