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

export const HomePage = observer(() => {
  const { sessionStore, roomStore, dataStore } = useStores();
  const _me = sessionStore._user;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationHeader style={{ backgroundColor: PrimaryColor }}>
            <Avatar src={PaulAtreides} name={_me} status="available" size="fluid" />
            <ConversationHeader.Content style={{ backgroundColor: PrimaryColor }} userName={_me}></ConversationHeader.Content>
          </ConversationHeader>

          <ConversationList style={{ backgroundColor: "#bacee0" }}>
            <Conversation name="Kynes" lastSenderName="Kynes" info="Yes i can do it for you">
              <Avatar src={Kynes} name="Kynes" status="available" />
            </Conversation>

            <Conversation name="Baron" lastSenderName="Baron" info="Yes i can do it for you">
              <Avatar src={Baron} name="Baron" status="dnd" />
            </Conversation>

            <Conversation name="Chani" lastSenderName="Chani" info="Yes i can do it for you" unreadCnt={3}>
              <Avatar src={Chani} name="Chani" status="available" />
            </Conversation>

            <Conversation name="DukeLeto" lastSenderName="DukeLeto" info="Yes i can do it for you">
              <Avatar src={DukeLeto} name="DukeLeto" status="unavailable" />
            </Conversation>

            <Conversation name="LadyJessica" lastSenderName="LadyJessica" info="Yes i can do it for you">
              <Avatar src={LadyJessica} name="LadyJessica" status="eager" />
            </Conversation>

            <Conversation name="Duncan" lastSenderName="Duncan" info="Yes i can do it for you">
              <Avatar src={DuncanIdaho} name="Duncan" status="away" />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatRoom></ChatRoom>
        {/* {roomStore.isChatRoomReady() && !!dataStore.ipfsNode ? <ChatRoom></ChatRoom> : <Loader></Loader>} */}
      </MainContainer>
    </div>
  );
});
