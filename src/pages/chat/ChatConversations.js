import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../data/store/RootStore.js";

// @ts-ignore
export const ChatConversations = observer(({ globalMonitor }) => {
  const { roomStore, dataStore } = useStores();
  // console.log(globalMonitor);
  const users = toJS(dataStore.peers);
  // console.log(users);

  function selectChatRoom(id) {
    console.log("select");
    roomStore.setSelectedRoom(id);
  }

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {users.map((item) => {
        const user = item.user;
        // console.log(user.user);
        return (
          <Conversation key={user.peerId} name={user._username} onClick={() => selectChatRoom(user.peerId)}>
            <Avatar status="dnd" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
