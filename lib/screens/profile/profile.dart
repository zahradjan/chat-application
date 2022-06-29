import 'package:Decentio/components/primary_button.dart';
import 'package:Decentio/configuration.dart';
import 'package:Decentio/constants.dart';
import 'package:Decentio/models/chatUser/ChatUser.dart';
import 'package:Decentio/screens/profile/profile_image_widget.dart';
import 'package:Decentio/state_management/profile/profile_cubit.dart';
import 'package:Decentio/state_management/profile/profile_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class Profile extends StatefulWidget {
  ChatUser profileUser;
  Profile({Key? key, required this.profileUser}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  String _username = '';
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: SafeArea(
            child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: DefaultPadding),
          child: Column(
            children: [
              Spacer(
                flex: 2,
              ),
              // SizedBox(height: DefaultPadding * 2),
              ProfileImageWidget(),
              SizedBox(height: 8),
              Text(
                widget.profileUser.name,
                style: Theme.of(context).textTheme.headline1,
              ),
              SizedBox(height: DefaultPadding * 2),
              TextFormField(
                decoration: InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Change your name',
                  hintText: widget.profileUser.name,
                ),
                onChanged: (value) {
                  _username = value;
                },
              ),
              SizedBox(height: 8),
              // TextFormField(
              //   decoration: const InputDecoration(
              //     border: UnderlineInputBorder(),
              //     labelText: 'Change your password',
              //   ),
              // ),
              SizedBox(height: DefaultPadding * 2),
              BlocConsumer<ProfileCubit, ProfileState>(
                builder: (context, state) => state is ProfileLoading
                    ? Center(child: CircularProgressIndicator())
                    : PrimaryButton(
                        text: "Confirm",
                        color:
                            Theme.of(context).buttonTheme.colorScheme!.primary,
                        press: () async {
                          await updateProfileInSession();
                        },
                      ),
                listener: (_, state) {
                  if (state is ProfileSuccess) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            ConfigurationBase.composeChatsUI(state.user),
                      ),
                    );
                  }
                },
              ),

              SizedBox(height: 8),
              PrimaryButton(
                  text: "Back",
                  color: Theme.of(context).buttonTheme.colorScheme!.secondary,
                  press: () => Navigator.maybePop(context)),
              Spacer(flex: 2)
            ],
          ),
        )),
      ),
    );
  }

  updateProfileInSession() async {
    //TODO: profile image upload
    await context.read<ProfileCubit>().updateProfile(name: _username);
  }
}
