import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../data/store/RootStore.js";

// @ts-ignore
export const ChatConversations = observer(({ globalMonitor }) => {
  const { roomStore } = useStores();
  // console.log(globalMonitor);
  const users = toJS(globalMonitor.peers);
  // console.log(users);

  function selectChatRoom(id) {
    console.log("select");
    roomStore.setSelectedRoom(id);
  }

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {users.map((user) => {
        // console.log(user);
        return (
          <Conversation key={user} onClick={() => selectChatRoom(user)}>
            <Avatar name={user} status="dnd" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
