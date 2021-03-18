# Infoscreen

A system to install public signages using web technology and the microservice approach

![Example Installation](/.git-images/preview.bmp)

I have published a [blog post](https://dev.to/michidk/create-a-digital-sign-using-a-raspberry-pi-automated-setup-46e2) about the Raspberry PI setup.

## Architecture

The 'Infoscreen' uses a [microservice architecture](https://microservices.io/patterns/microservices.html) and is built using Javascript, Node and NPM. The client uses Vue.js.

When setup in a Kubernetes cluster, the architecture could look like this:
![Architecture](/.git-images/architecture.jpg)

## Services

The system consists of the following microservices:

- [slide-api](/slide-api/README.md): Provides an API endpoint that returns active slides and their data from the database. Needs to be protected by some kind of proxy or HTTP auth.
- [client](/client/README.md): Contacts the slide API to render and serve a Vue.js app, which gets slide data from the slide-API
- management-api: TODO
- management-panel: TODO

The database [mongodb](https://www.mongodb.com/) is used to store the slides.

Optional microservices:

- [event-crawler](/event-crawler/README.md): Crawler example, which crawls a website built with [The Events Calendar](https://theeventscalendar.com/) for upcoming events and adds them as slides to the database
- [tribe-simulator](/tribe-simulator/README.md): Simulates the event API of The Events Calendar. Only used during development to inject test events.

The [shared](/shared/README.md) module contains models and shared code required by multiple modules.

## Building

Build instructions can be found in the readme-files of the module. To build them with docker, you have to specify the root folder as build context.
Example: `docker build -f ./client/Dockerfile .`

## Raspberry Pi

Production Setup on a RaspberryPI:
Read the instructions [here](/SETUP/RASPBERRYPI-SETUP.md).
