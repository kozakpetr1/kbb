@echo off
:: Získání aktuálního data a času
for /f "tokens=2 delims==." %%a in ('"wmic os get localdatetime /value"') do set datetime=%%a

:: Formátování data a času
set datestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%
set timestamp=%datetime:~8,2%:%datetime:~10,2%:%datetime:~12,2%

:: Git příkazy
git add .
git commit -m "Commit %datestamp% %timestamp%"
git push -u origin main

:: Oznámení o dokončení
echo Commit proveden %datestamp% %timestamp%.
pause
