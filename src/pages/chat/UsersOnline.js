import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { observer } from "mobx-react-lite";
import { AvatarGenerator } from "random-avatar-generator";
import { useStores } from "../../data/store/RootStore.js";

export const UsersOnline = observer(() => {
  const { monitorStore } = useStores();
  const users = monitorStore.peers;
  // console.log(users);

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {users.map((item) => {
        const user = item.data.user;

        return (
          <Conversation key={user.peerId} name={user._username}>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(user.peerId)} status="available" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
});
