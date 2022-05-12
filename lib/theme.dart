import 'package:Decentio/constants.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

ThemeData lightThemeData(BuildContext context) {
  return ThemeData.light().copyWith(
    primaryColor: PrimaryColor,
    scaffoldBackgroundColor: Colors.white,
    appBarTheme: appBarTheme,
    iconTheme: IconThemeData(color: ContentColorLightTheme),
    textTheme: TextTheme(
      headline1: GoogleFonts.getFont("Atkinson Hyperlegible",
          textStyle:
              TextStyle(fontSize: 24, color: TextLightThemePrimaryColor)),
      bodyText1: GoogleFonts.getFont("Atkinson Hyperlegible",
          textStyle: TextStyle(color: TextLightThemePrimaryColor)),
    ),
    colorScheme: ColorScheme.light(
        primary: PrimaryColor, secondary: SecondaryColor, error: ErrorColor),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: Colors.white,
      selectedItemColor: ContentColorLightTheme.withOpacity(0.8),
      unselectedItemColor: ContentColorLightTheme.withOpacity(0.33),
      selectedIconTheme: IconThemeData(color: PrimaryColor),
      showUnselectedLabels: true,
    ),
  );
}

final appBarTheme = AppBarTheme(centerTitle: false, elevation: 0);
