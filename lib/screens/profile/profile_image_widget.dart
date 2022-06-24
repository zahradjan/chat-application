import 'dart:io';

import 'package:Decentio/state_management/profile/profile_image_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ProfileImageWidget extends StatelessWidget {
  const ProfileImageWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 130,
      width: MediaQuery.of(context).size.width,
      child: InkWell(
        borderRadius: BorderRadius.circular(126.0),
        onTap: () async {
          await context.read<ProfileImageCubit>().getImage();
        },
        child: Center(
          child: BlocBuilder<ProfileImageCubit, String>(
            builder: (context, state) {
              return state == ''
                  ? Stack(
                      children: [
                        CircleAvatar(
                          backgroundColor:
                              Theme.of(context).colorScheme.secondary,
                          radius: 65,
                          child: Container(
                            child: Icon(Icons.person_outline_rounded,
                                size: 50.0, color: Colors.black),
                          ),
                        ),
                        AddPhotoWidget()
                      ],
                    )
                  : Stack(
                      children: [
                        CircleAvatar(
                          radius: 65,
                          child: ClipOval(
                            child: Image.file(File(state),
                                width: 400, height: 400, fit: BoxFit.fill),
                          ),
                        ),
                        AddPhotoWidget()
                      ],
                    );
            },
          ),
        ),
      ),
    );
  }
}

class AddPhotoWidget extends StatelessWidget {
  const AddPhotoWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 80,
      right: 0,
      child: Container(
        height: 50,
        width: 50,
        decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
                width: 3, color: Theme.of(context).scaffoldBackgroundColor),
            color: Theme.of(context).colorScheme.secondary),
        child: Icon(Icons.add_a_photo, size: 30.0, color: Colors.black),
      ),
    );
  }
}
