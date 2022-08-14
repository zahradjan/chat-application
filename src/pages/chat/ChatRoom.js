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
import { useFilePicker } from "use-file-picker";
import { ContentColorLight, PrimaryColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";

export const ChatRoom = observer(({ room }) => {
  const { dataStore, roomStore } = useStores();
  // const room = toJS(roomStore.selectedRoom);
  console.log(room);
  console.log(roomStore.selectedReceiver);

  // useEffect(() => {
  //   async function initRoom() {
  //     await room.init();
  //   }
  //   initRoom();
  // }, [room]);
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
  }, [filesContent, room]);

  const data = toJS(room.chatRoomMessages);
  const nodeId = dataStore.peerId;
  return (
    <ChatContainer style={{ backgroundColor: ContentColorLight }}>
      <ConversationHeader style={{ backgroundColor: PrimaryColor }}>
        <ConversationHeader.Back style={{ backgroundColor: PrimaryColor }} />
        {/* <Avatar src={Chani} name="Zoe" /> */}
        <ConversationHeader.Content style={{ backgroundColor: PrimaryColor }} userName={roomStore.selectedReceiver} />
      </ConversationHeader>
      <MessageList loading={!data}>
        {data
          ? data.map((msg) => {
              if (msg.type === "file") console.log(msg.data.file);
              return msg.type === "message" ? (
                <Message key={msg._id} model={{ direction: msg.from === nodeId ? "outgoing" : "incoming", position: "first", message: msg.data.msg }}>
                  <Avatar key={msg._id} src={msg.avatar}></Avatar>
                  <Message.Footer sender={msg.data.sender} sentTime={msg.sentTime}></Message.Footer>
                </Message>
              ) : (
                <Message key={msg._id} model={{ direction: msg.from === nodeId ? "outgoing" : "incoming", position: "first" }}>
                  <Message.CustomContent>
                    {room.fileIsImage(msg.data.msg.fileName) ? (
                      <img src={URL.createObjectURL(new Blob(msg.data.file))} alt={msg.data.msg.fileName} width={400} height={550}></img>
                    ) : (
                      <a href={URL.createObjectURL(new Blob(msg.data.file))} download={msg.data.msg.fileName}>
                        {/* <FileIcon extension={room.getFileExtension(msg.data.fileName)} labelTextStyle={{ width: 100, height: 100 }} type="image" /> */}
                        {msg.data.msg.fileName}
                      </a>
                    )}
                  </Message.CustomContent>
                  <Avatar key={msg._id} src={msg.avatar}></Avatar>
                  <Message.Footer sender={msg.data.sender} sentTime={msg.sentTime}></Message.Footer>
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
