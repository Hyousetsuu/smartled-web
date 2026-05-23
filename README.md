# SmartLED Web Controller & Hardware System

A sleek, responsive web interface and ESP32 hardware system for controlling smart WS2812B LEDs. This project features full synchronization between a web dashboard, an ESP32 microcontroller, and a Telegram Bot via Firebase Realtime Database.

## Features

- **Real-time Synchronization**: Instant updates across the web dashboard, Telegram bot, and physical ESP32 hardware using Firebase Realtime Database.
- **Color Wheel Selection**: Choose any custom solid color easily from the web.
- **Brightness Control**: Smooth slider to adjust the brightness level with smooth fading effects.
- **Auto Mode (LDR)**: Automatic adaptive brightness adjustment based on ambient light conditions.
- **Telegram Bot Control**: Control your LEDs directly from Telegram using commands like `/status`, `/auto`, `/terang`, `/merah`, and more.
- **Physical Switch**: Hardware push-button support for toggling the LEDs on/off, complete with state memory.
- **Animation Modes**: Over 20+ predefined animation effects (Breath, ColorWipe, Larson, Fire, Rainbow, Dual Scan, Halloween, Christmas, etc.).
- **Dual-Core Processing**: The ESP32 utilizes FreeRTOS to run animations smoothly on Core 1 while handling network tasks (WiFi, Firebase, Telegram) on Core 0.

## Hardware Requirements

- **Microcontroller**: ESP32
- **LED Strip**: WS2812B (Configured for 144 LEDs, but adjustable)
- **Sensor**: LDR (Light Dependent Resistor) Module for ambient light sensing
- **Button**: Physical push-button or switch

### Pin Configuration (ESP32)
- **Data Pin (LEDs)**: GPIO 4
- **Physical Switch**: GPIO 13 (Uses internal Pull-Up)
- **LDR Sensor**: GPIO 34 (ADC1)

## Tech Stack

- **Frontend**: React (v19), Vite, Modern CSS
- **Hardware**: Arduino C++ (FastLED, Firebase_ESP_Client, UniversalTelegramBot)
- **Backend/Database**: Firebase Realtime Database

## Getting Started (Web Interface)

### Prerequisites
- Node.js installed on your machine.
- A Firebase project with Realtime Database enabled.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hyousetsuu/smartled-web.git
   cd smartled-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy the example environment file to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and replace the placeholder values with your actual Firebase project credentials:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key_here
     VITE_FIREBASE_DATABASE_URL=your_database_url_here
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Telegram Bot Commands

You can interact with your ESP32 directly via Telegram using these commands:
- `/start` or `/menu` - Show the main menu
- `/status` - Check LED state, Brightness, Auto Mode, and LDR sensor readings
- `/off` - Turn off the LED
- `/auto` - Toggle Auto-Brightness (LDR)
- `/terang` / `/redup` - Increase or decrease brightness
- `/merah`, `/hijau`, `/biru`, `/solid` - Solid colors
- Various animation commands: `/pelangi`, `/fire`, `/ular`, `/breath`, `/fireworks`, etc.

## License

This project is for personal use and learning. Feel free to fork and modify!
