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
          child: CircleAvatar(
            radius: 70,
            backgroundColor: Theme.of(context).colorScheme.secondary,
            child: BlocBuilder<ProfileImageCubit, String>(
              builder: (context, state) {
                return ClipRRect(
                  borderRadius: BorderRadius.circular(100.0),
                  child: state == ''
                      ? Icon(Icons.person_outline_rounded,
                          size: 50.0, color: Colors.black)
                      : Image.file(File(state),
                          width: 400, height: 400, fit: BoxFit.fill),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
