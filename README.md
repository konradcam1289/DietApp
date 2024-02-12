# Personalized Diet App

The Personalized Diet App is a modern solution developed in React Native,
designed to assist you in managing your diet and healthy lifestyle. Leveraging
Firebase's database and authentication system, the app provides secure login
and registration, along with a suite of features to support diet planning and
monitoring.

## Features

- **Login and Registration**: Securely access your account to start managing
your diet.
- **Password Change**: Easily update your password for enhanced security.
- **BMI Calculator**: Calculate your Body Mass Index (BMI) to understand your
body better.
- **Dish List from Database**: Browse a list of dishes fetched from the database
to find your next meal.
- **Add Your Own Dish**: Have a favorite dish? Add it to the app complete with a
photo.
- **Nutrition Plan with Calendar**: Prepare your diet for any selected day using
the integrated calendar.
- **Shopping List**: Keep track of your grocery needs directly within the app.
- **Meal List with Calorie Summary**: View a list of meals with a summary of
calories for each day and the ability to input your own calorie count for
comparison.

## Getting Started

To get started with the Personalized Diet App, you need to set up your own Firebase project, as the app uses Firebase for database, authentication, and storage services. Follow these steps to configure your environment:

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the on-screen instructions.

2. **Configure Firebase with your app**:
   - In the Firebase console, add a new application and select the platform you are working with (iOS or Android).
   - Follow the setup instructions provided by Firebase to download the `google-services.json` or `GoogleService-Info.plist` and place it in the appropriate directory of your project.

3. **Enable Authentication**:
   - From the Firebase console, navigate to the "Authentication" section and enable the sign-in methods you want to use (e.g., email/password, Google, Facebook).

4. **Create a Firestore Database**:
   - Go to the "Firestore Database" section in the Firebase console and create a new database.
   - Start in test mode or set up your security rules as needed.

5. **Enable Storage** (if your app uses image uploads):
   - Navigate to the "Storage" section and follow the instructions to enable Firebase Storage.

Next, clone the repository and install the dependencies:

```bash
git clone https://your-repository-link-here.git
cd Personalized-Diet-App
npm install
```

Ensure you have React Native environment set up. If not, follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

After setting up your Firebase project, update the .env file in the root of your project with your Firebase configuration details:
```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```
Make sure to replace your_firebase_... with the actual configuration values found in your Firebase project settings.

## Usage
To run the app on your device, execute:

```
npx react-native run-android
or
npx react-native run-ios
```

Make sure you have an emulator running or a device connected to your development
machine.

## Acknowledgments

Firebase for authentication and database services.

React Native community for continuous support and resources.
