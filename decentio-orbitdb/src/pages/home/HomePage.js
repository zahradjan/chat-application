import Kynes from "../../images/kynes.jpg";
import Baron from "../../images/baron_harkonnen.jpg";
import Chani from "../../images/chani.jpg";
import DukeLeto from "../../images/leto_atreides.jpg";
import LadyJessica from "../../images/lady_jessica.jpg";
import DuncanIdaho from "../../images/duncan_idaho.jpg";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  InfoButton,
  MainContainer,
  // Search,
  Sidebar,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
export function HomePage() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}></Sidebar>
        {/* <Search placeholder="Search..." /> */}
        <ConversationList>
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
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={Chani} name="Zoe" />
            <ConversationHeader.Content userName="Chani" info="Active 10 mins ago" />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
