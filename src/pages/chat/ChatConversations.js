import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../data/store/RootStore.js";

export const ChatConversations = observer(() => {
  const { channelStore, roomStore } = useStores();

  const users = toJS(channelStore.peers);
  console.log(users);

  function selectChatConversation(id) {
    console.log("select");
    if (!roomStore.getRoom(id)) {
      const room = roomStore.createRoom(id);
      room.init();
    }
  }

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {users.map((user) => {
        console.log(user);
        return (
          <Conversation key={user} onClick={() => selectChatConversation(user)}>
            <Avatar name={user} status="dnd" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
