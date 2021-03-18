<template>
  <div>
    <div class="title" v-if="data.musengruppe">
      <span>{{ truncate(decodeText(data.musengruppe, 40)) }}</span>
    </div>
    <!-- <p v-if="data.excerpt">{{ decodeText(data.excerpt) }}</p> -->
    <!-- sort by title and iterate -->
    <div v-for="(events, title) in aggregateTitle(data.events)" :key="title">
      <div class="subtitle">{{ decodeText(title) }}</div>
      <!-- iterate through events with the same title -->
      <div v-for="(event, index) in events" :key="index" class="event-entry">
        <div v-if="event.date">{{ event.date }}</div>
        <div v-if="event.venue">{{ decodeText(event.venue) }}</div>
        <div v-if="event.cost">
          Eintritt:
          {{ decodeText(event.cost) }}
        </div>
        <div v-if="event.comment">{{ decodeText(event.comment) }}</div>
      </div>
    </div>
    <qrcode
      v-if="data.events[0] && data.events[0].mgUrl"
      :value="data.events[0].mgUrl"
      :options="{ width: 100 }"
      background="rgba(31, 31, 31, 0.685)"
      class="qrcode"
    ></qrcode>
  </div>
</template>

<script>
import { decodeTextMixin, truncateMixin } from "../../mixins/utils";

export default {
  name: "MusengruppeSlide",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    aggregateTitle(events) {
      const result = {};
      for (let i = 0; i < events.length; i++) {
        let item = events[i];
        if (!result[item.title]) result[item.title] = [];
        result[item.title].push(item);
      }
      return result;
    }
  },
  mixins: [decodeTextMixin, truncateMixin]
};
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 50pt;
  margin: 0 0 40px 0;
}

.event-entry {
  margin-bottom: 35px;
}
</style>
