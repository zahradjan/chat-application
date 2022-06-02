import 'package:Decentio/constants.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

ThemeData lightThemeData(BuildContext context) {
  return ThemeData.light().copyWith(
    primaryColor: PrimaryColor,
    scaffoldBackgroundColor: ContentColorLightTheme,
    appBarTheme: appBarTheme,
    iconTheme: IconThemeData(color: ContentColorLightTheme),
    textTheme: TextTheme(
      headline1: GoogleFonts.getFont("Atkinson Hyperlegible",
          textStyle:
              TextStyle(fontSize: 24, color: TextLightThemePrimaryColor)),
      bodyText1: GoogleFonts.getFont("Atkinson Hyperlegible",
          textStyle: TextStyle(color: PrimaryColor)),
    ),
    colorScheme: ColorScheme.light(
      primary: PrimaryColor,
      secondary: SecondaryColor,
      error: ErrorColor,
    ),
    buttonTheme: ButtonThemeData(
        colorScheme: ColorScheme.light().copyWith(
      primary: PrimaryColor,
      secondary: SecondaryColor,
      error: ErrorColor,
    )),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: ContentColorLightTheme,
      selectedItemColor: ContentColorLightTheme.withOpacity(0.8),
      unselectedItemColor: Colors.white,
      selectedIconTheme: IconThemeData(color: PrimaryColor),
      showUnselectedLabels: true,
    ),
  );
}

ThemeData darkThemeData(BuildContext context) {
  // Bydefault flutter provie us light and dark theme
  // we just modify it as our need
  return ThemeData.dark().copyWith(
    primaryColor: ContentColorDarkTheme,
    scaffoldBackgroundColor: ContentColorDarkTheme,
    appBarTheme: AppBarTheme(backgroundColor: ContentColorDarkTheme),
    iconTheme: IconThemeData(color: ContentColorDarkTheme),
    textTheme: TextTheme(
      headline1: GoogleFonts.getFont("Atkinson Hyperlegible",
          textStyle: TextStyle(fontSize: 24, color: TextDarkThemePrimaryColor)),
      bodyText1: GoogleFonts.getFont("Atkinson Hyperlegible",
          textStyle: TextStyle(color: Colors.white)),
    ),
    colorScheme: ColorScheme.dark().copyWith(
      primary: PrimaryColorDark,
      secondary: PrimaryColorDark.withOpacity(0.8),
      error: ErrorColor,
    ),
    buttonTheme: ButtonThemeData(
        colorScheme: ColorScheme.dark().copyWith(
      primary: PrimaryColor,
      secondary: SecondaryColor,
      error: ErrorColor,
    )),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: ContentColorDarkTheme,
      selectedItemColor: ContentColorDarkTheme,
      unselectedItemColor: ContentColorLightTheme.withOpacity(0.8),
      selectedIconTheme: IconThemeData(color: PrimaryColor),
      showUnselectedLabels: true,
    ),
  );
}

bool isLightTheme(BuildContext context) {
  return MediaQuery.of(context).platformBrightness == Brightness.light;
}

final appBarTheme = AppBarTheme(centerTitle: false, elevation: 0);
