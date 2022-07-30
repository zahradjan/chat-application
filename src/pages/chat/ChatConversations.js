import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { useStores } from "../../data/store/RootStore.js";

export const ChatConversations = () => {
  const { dataStore } = useStores();

  const users = dataStore.peersDb.all;

  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      {users.map((user) => {
        console.log(user);
        return (
          <Conversation name={user}>
            <Avatar name={user} status="dnd" />
          </Conversation>
        );
      })}
    </ConversationList>
  );
};
