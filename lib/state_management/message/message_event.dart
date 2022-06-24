part of 'message_bloc.dart';

abstract class MessageEvent extends Equatable {
  const MessageEvent();
  factory MessageEvent.onSubscribed(ChatUser user) => Subscribed(user);
  factory MessageEvent.onMessageSent(ChatMessage message) =>
      MessageSent(message);

  @override
  List<Object> get props => [];
}

class Subscribed extends MessageEvent {
  final ChatUser user;
  const Subscribed(this.user);

  @override
  List<Object> get props => [user];
}

class MessageSent extends MessageEvent {
  final ChatMessage message;
  const MessageSent(this.message);

  @override
  List<Object> get props => [message];
}

class _MessageReceived extends MessageEvent {
  const _MessageReceived(this.message);

  final ChatMessage message;

  @override
  List<Object> get props => [message];
}
