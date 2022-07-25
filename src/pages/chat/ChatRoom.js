import {
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
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { ContentColorLight, PrimaryColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";

export const ChatRoom = observer(() => {
  // const { channelStore } = useStores();

  // console.log(data);
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
      {/* <MessageList>
        {data.map((msg) => {
          console.log(msg);
          return <Message key={msg.message.key} model={{ sentTime: "just now", direction: "incoming", position: "first", message: msg }}></Message>;
        })}
      </MessageList> */}
      <MessageInput
        placeholder="Type message here"
        // onSend={(msg) => {
        //   channelStore.sendMessageToChatRoom("FirstChatRoom", msg);
        // }}
      />
    </ChatContainer>
  );
});
