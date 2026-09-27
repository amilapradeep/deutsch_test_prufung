@echo off
cd /d "%~dp0"
echo Starting DTZ test site with audio seek support...
start "DTZ Testsite" http://localhost:8000/
python serve.py --port 8000
pause
