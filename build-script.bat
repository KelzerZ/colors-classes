@echo off

dir build

if %errorlevel% equ 1 (
	npx tsc
) else (
	rmdir /s/q
	npx tsc
)