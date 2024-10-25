# Payoo - MFS Web App

**Payoo** is a Mobile Financial Service (MFS) web application that enables users to handle various financial transactions, including money transfers, bill payments, coupon redemption, and account management. Designed with custom routing and a seamless user experience, Payoo ensures users have control over their transactions and balances within a responsive and intuitive UI.

- [Live URL](https://payoo-nhb.vercel.app/)

## Features

### User Authentication

- **Login & Registration**: Users can register or log in using a simple interface. Data is stored in local storage.
- **Tab Toggle**: Users can easily switch between login and registration tabs, creating a smooth onboarding experience.

### Transactions

- **Transaction Types**: Implemented multiple transaction types, including:
  - Add Money
  - Cash Out
  - Money Transfers
  - Coupon Redemptions
  - Bill Payments
- **Transaction History**: All transactions are saved in local storage and displayed on a dedicated history page, providing users with clear and organized transaction records.
- **Coupon Redemption**: Users can redeem unique coupons for rewards directly through the app.

### Validation & Security

- **Form Validations**: Comprehensive validation across all transaction forms ensures error-free consistent user experience.
- **Duplicate Prevention**: Prevents self-transactions or redundant coupon redemptions.
- **Balance Limits**: Checks for sufficient balance during withdrawals and for account limits during deposits.

### Routing System

- **Custom Routing**: Navigation through various menus is handled by a custom routing system that ensures smooth transitions between pages.
- **URL Handling**: Incorrect or invalid menu URLs display a friendly error message, guiding users to the correct options.

## Technologies Used

- **HTML/CSS**: Structure and styling.
- **Tailwind CSS**: Custom, responsive, and utility-first CSS.
- **jQuery**: DOM manipulation.
- **FontAwesome**: Iconography.
- **TypeScript**: Typed JavaScript for robust code.
- **Vite**: Development environment and Build Tool.
- **Day.js**: Date and time manipulation.
- **bcryptjs**: For user password hashing and authentication.
- **Custom ID Generation**: Utilizing `@nazmul-nhb/id-generator` for unique user IDs.
- **Browser Local Storage**: For data storage and retrieval of user data and transactions.

## Setup and Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/nazmul-nhb/payoo-ts-jquery.git
cd payoo-ts-jquery
npm install
```

### Running Locally

To start the development server:

```bash
npm run dev
```

### Building for Production

To create an optimized build:

```bash
npm run build
```

## Live Demo

Experience the app [here on Vercel](https://payoo-nhb.vercel.app/).
