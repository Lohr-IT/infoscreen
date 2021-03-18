# RaspberryPi Linux Setup

You can find an explanation about this setup [here](https://dev.to/michidk/create-a-digital-sign-using-a-raspberry-pi-automated-setup-46e2).

## Install DietPi Linux on SD Card

### Prepare SD card

1. Download the DietPi image from [here](https://dietpi.com/downloads/images/DietPi_RPi-ARMv6-Buster.7z)
2. Unzip the image
3. Insert SD card
4. Use [balenaEtcher](https://www.balena.io/etcher/) to patch the image onto the SD card.
5. A) Put the `config.txt`, `dietpi.txt`, `dietpi-wifi.txt` and `Automation_Custom_Script.sh` in the root (`/`) folder on the SD card. You might want to modify `dietpi-wifi.txt`, to adjust the WiFi credentials.
5. B) 1. If that doesn't work, set `AUTO_SETUP_NET_WIFI_ENABLED=0` in the `dietpi.txt` and connect an ethernet cable. If you tried it before, you have to repeat all the previous steps, since the setup script is only executed once.
5. B) 2. If you want to connect the Pi to the WLAN afterwards, SSH into the Pi or switch TTY to execute `dietpi-config`.

### Setup

1. Safely eject the SD card and put it in the Raspberry Pi
2. Plug all your cables into the Raspberry Pi (making sure the power cable is last).
3. Let the setup run. You have to interact once and accept software terms by pressing enter. The infoscreen website should open after the setup finished.
