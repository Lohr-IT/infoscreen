<template>
  <div>
    <div v-if="data.title" class="title">
      <span>{{ decodeText(data.title) }}</span>
    </div>
    <div v-if="data.subtitle" class="subtitle">{{ decodeText(data.subtitle) }}</div>
    <div v-html="decodeText(data.text)" class="text"></div>
    <qrcode v-if="data.url" :value="data.url" :options="{ width: 100 }" class="qrcode"></qrcode>
  </div>
</template>

<script>
import { decodeTextMixin } from "../../mixins/utils";

export default {
  name: "TextSlide",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mixins: [decodeTextMixin]
};
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 50pt;
  margin: 0 0 40px 0;
}

.text {
  margin: 0 0 40px 0;
}
</style>
