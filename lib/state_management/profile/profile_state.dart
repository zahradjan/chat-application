import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:equatable/equatable.dart';

abstract class ProfileState extends Equatable {}

class ProfileInitial extends ProfileState {
  @override
  List<Object> get props => [];
}

class ProfileLoading extends ProfileState {
  @override
  List<Object> get props => [];
}

class ProfileSuccess extends ProfileState {
  final ChatUser user;

  ProfileSuccess(this.user);

  @override
  List<Object> get props => [user];
}
