@echo off
cd %~dp0
start "npm" /min npm run serve
start "npm" /min npm start
timeout /nobreak 10
start "npm" /min chrome.exe http://localhost:8080
echo "�I���̍ۂ͉��������Ă��������B"
timeout /t -1 >NUL
	for /f "tokens=2 delims=, usebackq" %%i in (`tasklist /v /nh /fo csv /fi "IMAGENAME eq cmd.exe" ^| findstr npm`) do ( taskkill /pid %%i) 
echo "�I���������܂��B"
timeout /t 2 >NUL
exit 