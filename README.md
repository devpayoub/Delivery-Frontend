# 📦 Delivery Pro - Frontend

A premium, modern delivery management dashboard built with **React** and **Chakra UI**. This dashboard provides a seamless experience for Owners, Employers, and Drivers to manage logistics in real-time.

---

## 🚀 Key Features

### 👑 Owner Dashboard
*   **Global Analytics**: Track pending, completed, and cancelled deliveries.
*   **Staff Management**: Create and manage Employer and Driver profiles.
*   **System Configuration**: Define Cities and Product Types.
*   **Security Logs**: Monitor all administrative actions in the system.

### 🏢 Employer Dashboard
*   **Delivery Logistics**: Create new delivery orders with client details and Sfax-based city pooling.
*   **Fleet Management**: Assign drivers to specific cities to organize the workforce.
*   **Real-time Tracking**: Monitor the status of deliveries created by the employer.

### 🚚 Driver Dashboard
*   **City Pool System**: Automatically view all available deliveries in the assigned city.
*   **Instant Updates**: Update delivery statuses (Pending -> Completed/Cancelled) with a single click.
*   **Personal Performance**: View history of assigned and completed tasks.

---

## 🛠️ Technology Stack

*   **Framework**: [React.js](https://reactjs.org/)
*   **UI Library**: [Chakra UI](https://chakra-ui.com/) (Horizon UI Theme)
*   **State Management**: React Context API
*   **Routing**: React Router v6
*   **Icons**: React Icons (Material Design)
*   **Charts**: ApexCharts & Recharts

---

## ⚙️ Getting Started

### 1. Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### 2. Installation
```bash
git clone https://github.com/devpayoub/Delivery-Frontend.git
cd Delivery-Frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your backend API URL:
```env
REACT_APP_API_URL=http://localhost:3000/api
```

### 4. Run Locally
```bash
npm start
```
The app will be available at `http://localhost:3001`.

---

## 📸 Design Philosophy
This project uses **Horizon UI**, a premium design system that prioritizes:
*   **Cleanliness**: Minimalist layouts with high focus on data.
*   **Responsiveness**: Fully optimized for mobile, tablet, and desktop.
*   **Aesthetics**: Sleek dark mode support and vibrant color palettes.

---

## 📄 License
Distributed under the MIT License.

---

**Developed with ❤️ by [devpayoub](https://github.com/devpayoub)**
