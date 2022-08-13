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
import { UsersOnline } from "../chat/UsersOnline.js";

export const HomePage = observer(() => {
  const { sessionStore, roomStore, monitorStore, dataStore } = useStores();
  const _me = sessionStore._user;

  const room = roomStore.selectedRoom;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationHeader>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(dataStore.peerId)} name={_me} status="available" size="fluid" />
            <ConversationHeader.Content userName={_me}></ConversationHeader.Content>
          </ConversationHeader>
          <ConversationHeader>
            <ConversationHeader.Content userName={"Chats"}></ConversationHeader.Content>
          </ConversationHeader>

          {!!roomStore.rooms ? <ChatConversations></ChatConversations> : <Loader></Loader>}
        </Sidebar>
        {room ? <ChatRoom room={room}></ChatRoom> : <NoRoom></NoRoom>}
        <Sidebar position="right" scrollable={false} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationHeader>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(dataStore.peerId)} name={_me} status="available" size="fluid" />
            <ConversationHeader.Content userName={_me}></ConversationHeader.Content>
          </ConversationHeader>
          <ConversationHeader>
            <ConversationHeader.Content userName={"Connected Users"}></ConversationHeader.Content>
          </ConversationHeader>

          {monitorStore.isMonitorReady() ? <UsersOnline></UsersOnline> : <Loader></Loader>}
        </Sidebar>
      </MainContainer>
    </div>
  );
});
