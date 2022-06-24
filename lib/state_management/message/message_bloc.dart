import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'message_event.dart';
part 'message_state.dart';

class MessageBloc extends Bloc<MessageEvent, MessageState> {
  MessageBloc() : super(MessageInitial()) {
    on<MessageEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
