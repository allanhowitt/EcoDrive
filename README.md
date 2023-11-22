# EcoDrive-App

EcoDrive-App is a React Native (Expo) application designed to provide users with eco-friendly transportation solutions. Through the app, users can plan their routes, track emissions, redeem rewards, and much more.

## Folder Structure

```plaintext
.
├── App.js
├── app.json
├── assets
│   ├── ...
├── babel.config.js
├── components
│   ├── ...
├── data
│   ├── ...
├── images
│   ├── ...
├── package.json
├── README.md
├── screens
│   ├── ...
├── slices
│   ├── ...
├── store.js
├── tailwind.config.js
├── utils
│   ├── ...
└── yarn.lock
```

## Getting Started

### Prerequisites

- Node.js and NPM
- React Native CLI
- Expo CLI
- A physical Android device or an Android emulator for testing and debugging
- Yarn package manager (Recommended)

### Setup & Running

1. **Clone the repository**

   ```sh
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install the dependencies**

   ```sh
   yarn install
   ```

3. **Setup .env configuration**
   - Copy `.env.example` to `.env`

     ```sh
     cp .env.example .env
     ```

   - Modify the `.env` file with appropriate configurations. By default, it contains:

     ```Python
     GOOGLE_MAPS_API_KEY=API-KEY
     API_URL=http://192.168.20.94:8001
     BROKER_URL=http://192.168.20.94:8002
     ```

4. **Run the application**

   ```sh
   yarn start
   ```

## Build & Release

1. **Improve Image quality (optional)**

   ```sh
   sudo npm install -g sharp-cli
   ```

2. **Generate Android and iOS directories**

   ```sh
   npx expo prebuild
   ```

3. **For Android build**
   - Navigate to the android directory:

     ```sh
     cd android
     ```

   - Generate APK and bundle:

     ```sh
     ./gradlew assembleRelease && ./gradlew bundleRelease
     ```

   - If there are compiling errors generating the APK and bundle, you can try:

     ```sh
     ./gradlew clean && ./gradlew assembleRelease && ./gradlew bundleRelease
     ```

4. **For iOS build**

   ```sh
   npx expo prebuild
   npx react-native run-android --mode="release"
   npx react-native build-android --mode=release
   ```

## Features & Components

- **Components**: A collection of reusable components used throughout the application, including broadcast indicators, navigation options, and cards.
  
- **Screens**: Different views or pages that the user interacts with, like the HomeScreen, UserProfileScreen, and Navigation.

- **Utils**: Utility functions and hooks that provide functionalities such as user location tracking and API interactions.

## Build Release

```shell
# Optionally to improve the Image quality of the builds
sudo npm install -g sharp-cli
# Generates the android and ios directories
npx expo prebuild
cd android
# Generate APK and bundle
./gradlew assembleRelease && ./gradlew bundleRelease
# If there are compiling errors generating the APK and bundle try this:
./gradlew clean && ./gradlew assembleRelease && ./gradlew bundleRelease
```

```shell
npx expo prebuild
# Run Android in release mode
npx react-native run-android --mode="release"
# Build Android in release mode to bundles
npx react-native build-android --mode=release
```

## Define the Point Calculation Logic

Firstly, we need to decide how to compute the points. One possible approach:

- Define a base point value, e.g., 1000 points per kilometer.
- For each transportation mode, define a penalty or multiplier based on CO2 emissions. For example:
  - Carro: 263/1000 (because it emits 263 gCO2/km)
  - Compartido (shared car): Maybe a value like 189.21/2000 (it emits less because it's shared)
  - Bicicleta: No penalty since it emits 0 gCO2.

Then, the formula for points might look something like:
> points = (base points - (distance x emission penalty)) x distance

## Further Considerations

- **User Engagement:** You can have levels or badges based on points. For instance, if someone collects 10,000 points, they become a "Green Warrior". This gamification can encourage users to choose environment-friendly modes of transportation.
- **Redemption:** Depending on the nature of your app, these points can be redeemed for rewards, discounts, or other benefits.
- **Advanced Analytics:** As your app collects more data, you can provide insightful analytics like "Total CO2 Saved", "Most Eco-Friendly Users", etc.
- **Feedback to Users:** Give users feedback on how choosing different modes of transportation impacts their points, and therefore their environmental impact. This can motivate more sustainable choices.
- **Speed tracker:** If an user is going too fast and for instance the user selected bike and goes with the speed of a car, we should alert the user and cancel/suspend the ride, because maybe is not being honest about the vehicle.
