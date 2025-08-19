@echo off
cd /d %~dp0backend
mvn install -DskipTests
mvn spring-boot:run
