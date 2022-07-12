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
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  InfoButton,
  MainContainer,
  MessageInput,
  // Search,
  Sidebar,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
import { useStores } from "../../data/storages/RootStorage.js";
import { ContentColorLight, PrimaryColor } from "../../constants/constants.js";
import { useEffect } from "react";

export function HomePage() {
  const { sessionStorage, mainStorage } = useStores();
  const _me = sessionStorage._user;
  useEffect(() => {
    mainStorage.init();
  }, []);

  console.log("HomePage user " + sessionStorage._user);
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
        <ChatContainer style={{ backgroundColor: ContentColorLight }}>
          <ConversationHeader style={{ backgroundColor: PrimaryColor }}>
            <ConversationHeader.Back style={{ backgroundColor: PrimaryColor }} />
            <Avatar src={Chani} name="Zoe" />
            <ConversationHeader.Content style={{ backgroundColor: PrimaryColor }} userName="Chani" info="Active 10 mins ago" />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
