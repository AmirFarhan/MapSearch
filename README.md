# Welcome to MapSearch 🌎

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It's dedicated to a React Native technical assessment round for Maybank Malaysia.
<div align="center">
   <img src="https://github.com/user-attachments/assets/f0891839-3164-46ee-b62b-cb7f9b30baff" width="300" />
   <img src="https://github.com/user-attachments/assets/45fbe7b0-3897-488e-8447-c2d8f0a4ccd5" width="300" />
</div>

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Add your google API key in PlaceAPI.ts to enable search

   ```bash
    const GOOGLE_API_KEY = "YOUR_API";
   ```
   
3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Implementation details

Utilized:
1. [expo-router](https://docs.expo.dev/router/introduction/) for navigation
2. [Ant-Design](https://rn.mobile.ant.design/components/list/) that's compatible with React Native
3. [redux-thunk](https://github.com/reduxjs/redux-thunk) for storing search history
4. [jest](https://jestjs.io/) to build and run tests
5. [react-native-maps](https://docs.expo.dev/versions/latest/sdk/map-view/) to display the location on a map

## File structure
```bash
.
├── README.md
├── api
│   └── placeAPI.ts
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── history.tsx
│   │   └── index.tsx
│   └── _layout.tsx
├── app.json
├── assets
│   ├── fonts
│   └── images
├── babel.config.js
├── components
│   ├── AutoCompleteSearch.tsx
│   └── LocationMap.tsx
├── constants
│   └── region.ts
├── expo-env.d.ts
├── jest.setup.js
├── package-lock.json
├── package.json
├── redux
│   ├── actions
│   │   └── searchActions.ts
│   ├── reducers
│   │   └── searchReducer.ts
│   └── store.ts
├── tests
│   ├── api
│   │   └── placeAPI.test.ts
│   ├── components
│   │   └── AutoCompleteSearch.test.tsx
│   └── redux
│       └── reducers
│           └── searchReducer.test.ts
├── tsconfig.json
└── types
    ├── placeTypes.ts
    └── reduxTypes.ts
```

## Key findings and future enhancements
1. [antd](https://ant.design/) is designed for web and is not completely compatible with React Native, had to use [@ant-design/react-native](https://rn.mobile.ant.design/) that is limited with components and documentation is not fully written in English.
2. Can add feature to clear history.
3. Should store Google API key in .env file and git ignore that file to avoid publishing online. Since this is an assessment round and I'm only pushing my code once, the constant lives in ```PlaceAPI.ts```.
4. Google Place API has location bias param, so if we use it to make predictions, the results are catered better for the user.
5. Can use Domain-Driven Design to structure files.
