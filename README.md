# Respore Sence - React Native Mobile Application Frontend

> **CI/CD & VS Code Ready Respiratory Telemetry & Air Quality Mobile Frontend**

Respore Sence is a complete React Native mobile application engineered with TypeScript, React Navigation, custom design tokens, centralized session management, mock/real API service abstraction, automated Jest test coverage, and a production-ready Jenkins CI/CD pipeline.

---

## 🚀 Key Features

1. **Complete Mobile User Experience**:
   - **Splash Screen**: Animated branding with session auto-detection.
   - **Onboarding Carousel**: 3-step feature highlight with progress dots and local storage persistence.
   - **Full Authentication Stack**: Login, Registration, Forgot Password, OTP 6-Digit Verification with resend timer, and Password Reset.
   - **Main Navigation Dashboard**: Bottom Tabs (Home, Search, Alerts, Profile) + Stack details navigation.
   - **Respiratory Biomarkers & Telemetry**: Real-time Air Quality Index (AQI), Oxygen Saturation (SpO2), Respiratory Rate (bpm), and Ambient Humidity telemetry widgets.
   - **Debounced Search**: Category filters (Telemetry, Device, Guides, Reports) and search term highlighting.
   - **Notification Center**: Read/unread status indicators, filter tabs, and mark-all-read capabilities.
   - **Profile & Device Telemetry**: Hardware connection status, firmware info, bio updates, emergency contact setup, and settings toggles.
   - **State Handling**: Universal LoadingView, EmptyView, ErrorView with connection retry, and ConfirmationModals.

2. **VS Code & CI/CD Development Architecture**:
   - **No Android Studio Prerequisite**: Developed and tested directly from VS Code. Headless source verification occurs via Node/npm CLI.
   - **Jenkins Pipeline Integration**: Fully configured `Jenkinsfile` with automated stages: Checkout -> Install -> Typecheck -> Lint -> Jest Unit Tests -> Coverage -> Mobile Build (Optional).

---

## 📂 Project Architecture

```
src/
├── assets/             # Images, icons, fonts
├── components/         # Reusable UI components
│   ├── buttons/        # PrimaryButton, SecondaryButton, OutlineButton
│   ├── cards/          # SummaryCard, ActivityCard, NotificationItem, ProfileItem
│   ├── common/         # ScreenContainer, AppHeader, Card, Avatar, Icon, ErrorBoundary
│   ├── inputs/         # TextInput, PasswordInput, OTPInput, SearchBar
│   ├── loaders/        # Loader, LoadingView
│   ├── modals/         # ConfirmationModal, BottomSheetModal
│   └── states/         # EmptyView, ErrorView, SuccessMessage
├── config/             # Environment configuration (env.ts)
├── constants/          # Application constants & default settings
├── context/            # AuthContext (session, user, settings state)
├── hooks/              # useAuth, useDebounce
├── mocks/              # Mock data & mock services for offline development
├── navigation/         # RootNavigator, AuthNavigator, MainTabNavigator, types.ts
├── screens/            # 14+ complete mobile screens
│   ├── auth/           # Login, Register, ForgotPassword, OtpVerification, ResetPassword
│   ├── details/        # DetailScreen
│   ├── home/           # HomeScreen
│   ├── notifications/  # NotificationsScreen
│   ├── onboarding/     # OnboardingScreen
│   ├── profile/        # ProfileScreen, EditProfileScreen
│   ├── search/         # SearchScreen
│   ├── settings/       # SettingsScreen
│   └── splash/         # SplashScreen
├── services/           # API Client & auth/data service layer (API/Mock switchable)
├── theme/              # Centralized design system (colors, typography, spacing, shadows)
├── types/              # Strict TypeScript interfaces
└── utils/              # storage, validation, formatters, logger

__tests__/              # Jest unit & component test suite + mocks
Jenkinsfile             # Declarative Jenkins CI/CD pipeline script
.env.example            # Environment sample file
package.json            # Dependencies & CLI scripts
tsconfig.json           # TypeScript configuration
```

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **VS Code** (or your preferred text editor)

### Quick Start Commands

```bash
# 1. Clone repository
git clone <repository-url>
cd "mobile app for rs"

# 2. Install dependencies cleanly
npm install

# 3. Environment configuration
cp .env.example .env

# 4. Verify TypeScript static types
npm run typecheck

# 5. Run ESLint code style check
npm run lint

# 6. Execute Jest unit & component tests
npm test

# 7. Run test coverage report
npm run test:coverage
```

---

## 🛠️ Package Scripts

| Command | Action |
| :--- | :--- |
| `npm run typecheck` | Validates TypeScript static compiler checks (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint analysis across all `.ts` and `.tsx` source files |
| `npm run lint:fix` | Automatically fixes mechanical ESLint violations |
| `npm test` | Runs Jest headless unit and component test suite |
| `npm run test:coverage` | Generates HTML and LCOV test coverage reports in `/coverage` |
| `npm run format` | Applies Prettier code formatting |
| `npm run format:check` | Verifies Prettier code formatting compliance |
| `npm run ci:validate` | Complete CI verification suite (Typecheck + Lint + Test + Coverage) |

---

## 🤖 Jenkins CI/CD Pipeline Configuration

The included `Jenkinsfile` provides a 6-stage automated pipeline:

1. **Checkout**: Retrieves source code repository.
2. **Install Dependencies**: Executes `npm ci` for reproducible dependency installations.
3. **TypeScript Verification**: Runs `npm run typecheck`. Fails build on type errors.
4. **ESLint Verification**: Runs `npm run lint`. Fails build on code quality errors.
5. **Unit & Component Tests**: Executes `npm test` with JUnit XML results archived for Jenkins test reporting.
6. **Code Coverage Analysis**: Archives coverage artifacts (`/coverage`).
7. **Mobile Native Build (Optional)**: Triggered when Jenkins parameter `BUILD_MOBILE=true`.

> **Note**: Android Studio is **not** required on the Jenkins master agent for static verification (stages 1-6). Mobile build compilation (stage 7) can be enabled when Android/iOS SDK toolchains are present.

---

## 🔐 Security & Architecture Best Practices

- **Zero Hardcoded Secrets**: All backend endpoints are driven by environment variables (`Config.API_BASE_URL`).
- **Sanitized Logger**: Development logger automatically strips passwords, tokens, and OTP codes from console logs.
- **Error Boundaries**: React Error Boundary catches UI rendering failures and offers reload actions without crashing the mobile app.
