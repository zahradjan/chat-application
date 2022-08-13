import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { AvatarGenerator } from "random-avatar-generator";
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
        console.log(item);
        const user = item.data.user;
        console.log(user.peerId);
        console.log(user._username);
        return (
          <Conversation key={user.peerId} name={user._username} onClick={() => selectChatRoom(user)}>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(user.peerId)} status="available" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
