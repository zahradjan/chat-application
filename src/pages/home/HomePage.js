import {
  Avatar,
  Button,
  Conversation,
  ConversationHeader,
  ConversationList,
  EllipsisButton,
  MainContainer,

  // Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import { useStores } from "../../data/store/RootStore.js";
import { ContentColorLight, PrimaryColor } from "../../constants/constants.js";
import { observer } from "mobx-react";
import { ChatRoom } from "../chat/ChatRoom.js";
import { Loader } from "../../components/Loader.js";
import { ChatConversations } from "../chat/ChatConversations.js";
import { toJS } from "mobx";
import { useCallback, useEffect, useRef } from "react";
import { NoRoom } from "../../components/error/NoRoom.js";
import { AvatarGenerator } from "random-avatar-generator";
import { UsersOnline } from "../chat/UsersOnline.js";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import "../login/LoginPageStyle.css";
import DecentioLogo from "../../icons/decentioLogoLight.png";

export const HomePage = observer(() => {
  const { sessionStore, roomStore, monitorStore, dataStore } = useStores();
  const _me = sessionStore._user;
  const users = monitorStore.peers;
  const roomNameRef = useRef(null);
  let selectedUsers = [];
  function selectUser(user) {
    const isAlreadyAdded = selectedUsers.find((selectedUser) => selectedUser._username === user._username);
    console.log(isAlreadyAdded);
    if (isAlreadyAdded) return;
    selectedUsers.push(user);
    console.log(selectedUsers);
  }
  const [showModal, hideModal] = useModal(
    () => (
      <ReactModal
        style={{ overlay: { zIndex: 1000 }, content: { backgroundColor: ContentColorLight } }}
        appElement={document.getElementById("root")}
        isOpen
      >
        {
          <div>
            <h1>Room name:</h1>
            <form onSubmit={() => {}}>
              <input ref={roomNameRef} placeholder="Enter room name" className="loginFormInput" name="RoomName"></input>
            </form>
            <h1>Available users:</h1>
            <ConversationList style={{ backgroundColor: "#bacee0" }}>
              {users.map((item) => {
                const user = item.data.user;

                return (
                  <Conversation key={user.peerId} name={user._username} onClick={() => selectUser(user)}>
                    <Avatar src={new AvatarGenerator().generateRandomAvatar(user.peerId)} status="available" />
                  </Conversation>
                );
              })}
            </ConversationList>

            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}>
              <button className="submitButton" onClick={(e) => createChatRoom(e)}>
                Create room
              </button>
              <button className="submitButton" onClick={hideModal}>
                Close
              </button>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: ContentColorLight,
              }}
            >
              <img style={{ margin: "100px" }} alt="logo" width={350} height={250} src={DecentioLogo}></img>
            </div>
          </div>
        }
      </ReactModal>
    ),
    []
  );
  const room = roomStore.selectedRoom;
  const createChatRoom = useCallback((e) => {
    e.preventDefault();
    const roomName = roomNameRef.current.value;
    console.log(selectedUsers);
    if (roomName) {
      roomStore.createChatRoom(roomName, selectedUsers);
      selectedUsers = [];
    }
    hideModal();
  }, []);
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationHeader>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(dataStore.peerId)} name={_me} status="available" size="fluid" />
            <ConversationHeader.Content userName={_me}></ConversationHeader.Content>
          </ConversationHeader>
          <ConversationHeader>
            <ConversationHeader.Content userName={"Chats"}></ConversationHeader.Content>
            <ConversationHeader.Actions>
              <Button onClick={showModal} />
            </ConversationHeader.Actions>
          </ConversationHeader>

          {!!roomStore.rooms ? <ChatConversations></ChatConversations> : <Loader></Loader>}
        </Sidebar>
        {room ? <ChatRoom room={room}></ChatRoom> : <NoRoom></NoRoom>}
        <Sidebar position="right" scrollable={false} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationHeader>
            <Avatar src={new AvatarGenerator().generateRandomAvatar(dataStore.peerId)} name={_me} status="available" size="fluid" />
            <ConversationHeader.Content userName={_me}></ConversationHeader.Content>
          </ConversationHeader>
          <ConversationHeader>
            <ConversationHeader.Content userName={"Connected Users"}></ConversationHeader.Content>
          </ConversationHeader>

          {monitorStore.isMonitorReady() ? <UsersOnline></UsersOnline> : <Loader></Loader>}
        </Sidebar>
      </MainContainer>
    </div>
  );
});
