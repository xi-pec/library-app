# What is this?
This is a mobile application designed to make library attendance in PSHS-CBZRC a quick and easy process.
Made with React, Tailwind, Capacitor, HeroUI, and 12 hours of continuous programming.

# How to install?
## Prerequisites
- npm
- git (optional)
- Android Studio (for android)
- Xcode (for iOS)

## Initial setup
Clone the repository using:
```sh
git clone https://github.com/xi-pec/library-app
```
or download the source code above.

Then, install the dependencies and build the app using:
```sh
npm install
npm run build
```

## Android
Sync and initialize the Android platform using:
```sh
npx cap sync
npx cap add android
```

Then, open the generate the Android project using:
```sh
npx cap open android
```
and build the project using Android Studio.

## iOS
> [!CAUTION]
> Not tested, will not provide support.

Install the `@capacitor/ios` package using:
```sh
npm install @capacitor/ios
```

Sync and initialize the iOS platform using:
```sh
npx cap sync
npx cap add ios
```

Then, open the generate the iOS project using:
```sh
npx cap open ios
```
and build the project using Xcode.

# Questions
Q: Will there be official builds of the app?  
A: Possibly for Android, but likely not for iOS.
