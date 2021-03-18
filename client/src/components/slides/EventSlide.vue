<template>
  <div>
    <div class="title">
      <span>{{ truncate(decodeText(data.title, 40)) }}</span>
    </div>
    <div class="excerpt">{{ truncate(decodeText(data.excerpt), 200) }}</div>
    <div class="date">
      <div v-if="data.date">{{ data.date }}</div>
      <div v-if="data.venue">{{ decodeText(data.venue) }}</div>
      <div v-if="data.cost">
        Eintritt:
        {{ decodeText(data.cost) }}
      </div>
      <div v-if="data.comment">{{ decodeText(data.comment) }}</div>
    </div>
    <qrcode v-if="data.url" :value="data.url" :options="{ width: 100 }" class="qrcode"></qrcode>
  </div>
</template>

<script>
import { decodeTextMixin, truncateMixin } from "../../mixins/utils";

export default {
  name: "EventSlide",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mixins: [decodeTextMixin, truncateMixin]
};
</script>

<style lang="scss" scoped>
.excerpt {
  margin: 0 0 40px 0;
}

.date {
  margin: 0 0 40px 0;
}
</style>
