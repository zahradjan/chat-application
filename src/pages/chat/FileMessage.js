const { Message, Avatar } = require("@chatscope/chat-ui-kit-react");
const { useStores } = require("../../data/store/RootStore.js");

export function FileMessage({ msg }) {
  const { roomStore, dataStore } = useStores();

  const room = roomStore.getRoom("TestRoom");
  const nodeId = dataStore.peerId;
  return (
    <Message
      key={msg._id}
      model={{
        direction: msg.from === nodeId ? "outgoing" : "incoming",
        position: "first",
      }}
    >
      <Message.CustomContent>
        {room.fileIsImage(msg.data.fileName) ? (
          <img src={URL.createObjectURL(msg.data.file)} alt={msg.data.fileName} width={400} height={550}></img>
        ) : (
          <a href={URL.createObjectURL(msg.data.file)} download={msg.data.fileName}>
            {/* <FileIcon extension={room.getFileExtension(msg.data.fileName)} labelTextStyle={{ width: 100, height: 100 }} type="image" /> */}
            {msg.data.fileName}
          </a>
        )}
      </Message.CustomContent>
      <Avatar key={msg._id} src={msg.avatar}></Avatar>
      <Message.Footer sender={msg.from} sentTime={msg.sentTime}></Message.Footer>
    </Message>
  );
}
