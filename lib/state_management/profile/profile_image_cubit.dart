import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ProfileImageCubit extends Cubit<String> {
  final _picker = FilePicker.platform;

  ProfileImageCubit() : super('');

  Future<void> getImage() async {
    FilePickerResult? image =
        await _picker.pickFiles(allowMultiple: false, type: FileType.image);
    if (image == null) return;
    var imgPath = image.files[0].path;

    emit(imgPath!);
  }
}
