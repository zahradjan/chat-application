import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  Message,
  MessageInput,
  MessageList,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { ContentColorLight, PrimaryColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";

export const ChatRoom = observer(() => {
  const { roomStore, dataStore } = useStores();
  const room = roomStore.getRoom("TestRoom");
  useEffect(() => {
    async function initRoom() {
      await room.init();
    }
    initRoom();
  }, [room]);

  const data = toJS(room.chatRoomMessages);
  const nodeId = dataStore.peerId;
  return (
    <ChatContainer style={{ backgroundColor: ContentColorLight }}>
      <ConversationHeader style={{ backgroundColor: PrimaryColor }}>
        <ConversationHeader.Back style={{ backgroundColor: PrimaryColor }} />
        {/* <Avatar src={Chani} name="Zoe" /> */}
        <ConversationHeader.Content style={{ backgroundColor: PrimaryColor }} userName="Chani" info="Active 10 mins ago" />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList loading={!data}>
        {data
          ? data.map((msg) => {
              // console.log(msg);
              // console.log(nodeId);
              return (
                <Message key={msg._id} model={{ direction: msg.from === nodeId ? "outgoing" : "incoming", position: "first", message: msg.data }}>
                  <Avatar key={msg._id} src={msg.avatar}></Avatar>
                  <Message.Footer sender={msg.from} sentTime={msg.sentTime}></Message.Footer>
                </Message>
              );
            })
          : ""}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        onSend={(msg) => {
          room.sendMessageToChatRoom(msg);
        }}
      />
    </ChatContainer>
  );
});
