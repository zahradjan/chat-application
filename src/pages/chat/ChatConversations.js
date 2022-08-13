import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { AvatarGenerator } from "random-avatar-generator";
import { useStores } from "../../data/store/RootStore.js";

export const ChatConversations = observer(() => {
  const { roomStore } = useStores();
  const rooms = toJS(roomStore.rooms);
  // console.log(users);

  function selectChatRoom(roomName) {
    console.log("select");
    roomStore.selectRoom(roomName);
  }

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {rooms.map((item) => {
        console.log(item);

        return (
          <Conversation key={item.roomId} name={item.roomName} onClick={() => selectChatRoom(item.roomName)}>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(item.roomName)} status="available" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
