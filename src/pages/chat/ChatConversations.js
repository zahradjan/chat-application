import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../data/store/RootStore.js";

export const ChatConversations = observer(() => {
  const { roomStore, monitorStore } = useStores();
  const users = toJS(monitorStore.peers);
  // console.log(users);

  function selectChatRoom(user) {
    console.log("select");
    roomStore.setSelectedRoom(user);
  }

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {users.map((item) => {
        const user = item.user;
        // console.log(user.user);
        return (
          <Conversation key={user.peerId} name={user._username} onClick={() => selectChatRoom(user)}>
            <Avatar status="dnd" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
