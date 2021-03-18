<template>
  <div class="full">
    <slider
      animation="normal"
      :autoplay="true"
      :interval="15000"
      :control-btn="showSliderControls()"
      :height="pixelHeight"
      indicators="center"
    >
      <slider-item v-for="(slide, index) in slides" :key="index" :style="getBackgroundStyle(slide)">
        <img :src="`${publicPath}agv_logo.svg`" id="logo" />
        <div class="caption">
          <div class="inner">
            <!-- RENDER TYPE   T E X T -->
            <TextSlide v-if="slide.renderType == RenderType.text" v-bind:data="slide.data" />
            <!-- RENDER TYPE   E V E N T -->
            <EventSlide v-if="slide.renderType == RenderType.event" v-bind:data="slide.data" />
            <!-- RENDER TYPE   M U S E N G R U P P E -->
            <MusengruppeSlide
              v-if="slide.renderType == RenderType.musengruppe"
              v-bind:data="slide.data"
            />
          </div>
        </div>
      </slider-item>
    </slider>
  </div>
</template>

<script>
import axios from "axios";

import { Slider, SliderItem } from "vue-easy-slider";
import { RenderType } from "shared/models/slide.js";

// slide types
import TextSlide from "./slides/TextSlide";
import EventSlide from "./slides/EventSlide";
import MusengruppeSlide from "./slides/MusengruppeSlide";

export default {
  name: "Slideshow",
  data: () => ({
    slides: [],
    windowHeight: 0,
    RenderType,
    publicPath: process.env.BASE_URL
  }),
  mounted() {
    // schedule update timer
    const updateInterval =
      Number(process.env.VUE_APP_SLIDE_UPDATE_INTERVAL) || 60 * 5; // in seconds
    this.timer = setInterval(this.fetchEvents, 1000 * updateInterval);

    // handle resizing
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();

    // initial data
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      const eventApi =
        "https://infoscreen.cloud.agv-muenchen.de/api/slides" ||
        process.env.VUE_APP_SLIDE_API;

      this.$log.info("Fetching Events...");
      axios
        .get(eventApi)
        .then(r => {
          this.processEvents(r);
        })
        .catch(e => {
          this.$log.error(e);
        });
    },
    processEvents(r) {
      // add outer div, required in vue templates
      r.data.forEach(slide => (slide.vueHtml = `<div>${slide.vueHtml}</div>`));

      this.slides = r.data;
      this.$log.info("Recieved events: ", this.sildes);
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResize);
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    getBackgroundStyle(slide) {
      if (!slide.image)
        slide.image =
          process.env.VUE_APP_DEFAULT_IMAGE ||
          "https://www.agv-muenchen.de/wp-content/uploads/2017/09/Gro%C3%9Fer-Saal-1024x674.jpg";
      return `background-image:url('${slide.image}'); background-size: cover; background-position: center;`;
    },
    showSliderControls() {
      return process.env.VUE_APP_SHOW_SLIDER_CONTROLS == true || false;
    }
  },
  computed: {
    pixelHeight() {
      return this.windowHeight + "px";
    }
  },
  components: {
    Slider,
    SliderItem,
    TextSlide,
    EventSlide,
    MusengruppeSlide
  }
};
</script>

<style lang="scss">
/* variables */
$title-height: 300px;

/* css reset */
html,
body,
.app {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* roboto font */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");
.body,
.caption {
  font-family: "Open Sans", sans-serif;
}

#logo {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 100;
  width: 40%;
}

.qrcode {
  vertical-align: right;
  position: fixed;
  top: 30px;
  left: 30px;
  border-radius: 10px;
  opacity: 0.75;
  z-index: 100;
}

/* caption */
@keyframes scroll-up {
  0% {
    max-height: $title-height;
  }
  100% {
    max-height: 100%;
  }
}

.caption {
  position: fixed;
  left: 0;
  bottom: 0;
  height: auto;
  width: 100vw;

  background: rgba(31, 31, 31, 0.685);
  font-size: 35pt;
  color: white;

  white-space: normal;

  animation-name: scroll-up;
  animation-duration: 5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-delay: 2s;

  max-height: $title-height;

  .inner {
    margin: 0 40px 0 40px;
  }
}

/* caption styling */
.title {
  font-size: 60pt;
  font-weight: bold;
  height: $title-height;
  margin: 0;
  vertical-align: middle;
  text-align: center;
  width: 100%;

  /* https://stackoverflow.com/questions/25690519/how-to-vertically-center-dynamically-1-or-2-lines-of-text-with-css */
  display: table;
  span {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 100%;
  }
}

.bold {
  font-weight: bold;
}

/* move/style slider indicators */
.slider-indicators {
  bottom: 8px !important;
}
.slider-indicator-icon {
  background-color: rgba(83, 83, 83, 0.705) !important;
}
.slider-indicator-active {
  background-color: rgba(245, 245, 245, 0.842) !important;
}
</style>
