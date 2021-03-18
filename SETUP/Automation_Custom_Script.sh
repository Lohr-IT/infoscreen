echo "Executing custom scipts..."


echo "Setup chromium kiosk"

echo -e "if [[ \"$(tty)\" = \"/dev/tty1\" ]]; then
  . /root/run-infoscreen.sh
fi
" > /root/.bashrc

echo -e "# turn off screensaver
xset -dpms
xset s off
xset s noblank

# Resolution to use for kiosk mode, should ideally match current system resolution
RES_X=$(grep -m1 '^[[:blank:]]*SOFTWARE_CHROMIUM_RES_X=' /DietPi/dietpi.txt | sed 's/^[^=]*=//')
RES_Y=$(grep -m1 '^[[:blank:]]*SOFTWARE_CHROMIUM_RES_Y=' /DietPi/dietpi.txt | sed 's/^[^=]*=//')

# URL
URL=$(grep -m1 '^[[:blank:]]*SOFTWARE_CHROMIUM_AUTOSTART_URL=' /DietPi/dietpi.txt | sed 's/^[^=]*=//')

# Chromiom args
CHROMIUM_OPTS=\" --no-sandbox --homepage \$URL --app --start-fullscreen --check-for-update-interval=604800 --window-size=\$RES_X,\$RES_Y --app-window-size=\$RES_X,\$RES_Y --window-position=0,0 --incognito --noerrdialogs --disable-infobars \"

# Chromium binary
FP_CHROMIUM=\"$(command -v chromium-browser)\"

xinit \$FP_CHROMIUM \$CHROMIUM_OPTS -- -nocursor
" > /root/run-infoscreen.sh

echo -e "Section "Monitor"
        Identifier "Monitor0"
        Option "Rotate" "left"
EndSection

Section "Screen"
        Identifier "Screen0"
        Device "Card0"
        Monitor "Monitor0"
EndSection
" > /etc/X11/xorg.conf.d/01-rotate-screen.conf


echo "Add reboot and display times cronjob"
echo "0 8 * * * root /sbin/shutdown -r
0 1 * * * root DISPLAY=:0 xset dpms force off
55 7 * * * root DISPLAY=:0 xset dpms force on
" >> /etc/crontab


echo "Set motd"
echo -e "
\e[34mWelcome to the \e[35mAGV Infoscreen\e[34m!

\e[31mWARNING\e[34m: Unauthorized access to this system is forbidden and will be
prosecuted by law. By accessing this system, you agree that your actions
may be monitored if unauthorized usage is suspected.\e[0m
" > /etc/motd


exit 0
