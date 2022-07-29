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
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { ContentColorLight, PrimaryColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";

import baron from "../../images/baron_harkonnen.jpg";

export const ChatRoom = observer(() => {
  const { roomStore, dataStore } = useStores();
  const room = roomStore.getRoom("TestRoom");
  useEffect(() => {
    async function initRoom() {
      await room.init();
    }
    initRoom();
  }, [room]);
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: ["*"],
    readAs: "ArrayBuffer",
    multiple: false,
  });
  useEffect(() => {
    async function loadFile() {
      console.log(filesContent);
      if (filesContent.length) await room.uploadFile(filesContent);
    }
    loadFile();
  }, [room, filesContent]);

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
              console.log(msg.data.filePath);
              return typeof msg.data !== "object" ? (
                <Message key={msg._id} model={{ direction: msg.from === nodeId ? "outgoing" : "incoming", position: "first", message: msg.data }}>
                  <Avatar key={msg._id} src={msg.avatar}></Avatar>
                  <Message.Footer sender={msg.from} sentTime={msg.sentTime}></Message.Footer>
                </Message>
              ) : (
                <Message key={msg._id} model={{ direction: msg.from === nodeId ? "outgoing" : "incoming", position: "first" }}>
                  <Message.CustomContent>
                    {/* <a href={URL.createObjectURL(msg.data.filePath)} download={msg.data.fileName}>
                      {msg.data.fileName}
                    </a> */}
                    <img src={URL.createObjectURL(msg.data.filePath)} alt={msg.data.fileName} width={400}></img>
                  </Message.CustomContent>
                  {/* <Message.ImageContent src={msg.data.filePath} alt={msg.data.fileName} width={200}></Message.ImageContent> */}
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
        onAttachClick={async () => openFileSelector()}
      />
    </ChatContainer>
  );
});
