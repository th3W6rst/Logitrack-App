@echo off
cd /d %~dp0frontend
if "%EXPO_WEB_PORT%"=="" set EXPO_WEB_PORT=8082
npm install
npx expo start --web
