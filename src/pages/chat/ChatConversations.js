import { Avatar, Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";

export const ChatConversations = () => {
  return (
    <ConversationList style={{ backgroundColor: "#bacee0" }}>
      <Conversation name="Baron" lastSenderName="Baron" info="Yes i can do it for you">
        <Avatar name="Baron" status="dnd" />
      </Conversation>
    </ConversationList>
  );
};
