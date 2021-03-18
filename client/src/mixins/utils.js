import he from "he";

export const decodeTextMixin = {
  methods: {
    decodeText: function (text) {
      if (!text) return "";
      return he.decode(text);
    }
  }
};

export const truncateMixin = {
  methods: {
    truncate: function (input, charCount) {
      return input.length > charCount ? `${input.substring(0, charCount)}...` : input;
    }
  }
}
