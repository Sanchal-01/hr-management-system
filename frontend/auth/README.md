# 🔐 Authentication Module (Frontend)

This folder contains the **authentication-related frontend pages** of the HR Management System.
It handles user sign-up and sign-in functionality and serves as the entry point for accessing
different parts of the application.

The authentication flow is designed to ensure that only valid users can access
employee and HR-related modules.

---

## 🎯 Purpose of This Module

- Provide user authentication (Sign Up / Sign In)
- Control access to HR and Employee dashboards
- Handle basic input validation at the frontend level
- Integrate authentication logic with backend services (if applicable)

---

## 📂 Files Included

- `SignUp.html`  
  Used for **new user registration**.  
  Collects required user details and initiates the account creation process.

- `SignIn.html`  
  Used for **existing user login**.  
  Verifies user credentials and allows access to the system upon successful authentication.

---

## 🔄 Authentication Flow

1. User opens the **Sign Up** page to create an account (if not registered)
2. User logs in using the **Sign In** page
3. On successful authentication, the user is redirected to the appropriate dashboard
4. Invalid credentials are handled with proper feedback messages

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- Authentication service integration (e.g., Firebase)

---

## 📝 Note

This module focuses on **frontend-level authentication handling**.
Backend validation and security rules should be implemented separately
to ensure complete system security.
