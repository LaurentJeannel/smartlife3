@echo off

rem Ensure this Node.js and npm are first in the PATH
set "PATH=%APPDATA%\npm;%~dp0;%PATH%"
set NODE_PATH=C:\JarvisIA\NodeJS\node_modules\npm\node_modules;%NODE_PATH%
setlocal enabledelayedexpansion
pushd "%~dp0"

rem Figure out the Node.js version.
set print_version=C:\JarvisIA\NodeJS\node.exe -p -e "process.versions.node + ' (' + process.arch + ')'"
for /F "usebackq delims=" %%v in (`%print_version%`) do set version=%%v

rem Print message.
if exist npm.cmd (
  echo Your environment has been set up for using Node.js !version! and npm.
) else (
  echo Your environment has been set up for using Node.js !version!.
)

popd
endlocal

node C:\JarvisIA\plugins\smartlife2\cli wizard