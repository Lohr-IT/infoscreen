export const RenderType = Object.freeze({ text: 1, event: 2, musengruppe: 3 });
Object.freeze(RenderType);

export const createSlideSchema = function (mongoose) {
  // setup schema
  const slideSchema = mongoose.Schema(
    {
      // optional tags to indentify the slide
      tags: {
        type: [String],
      },
      // priority sorts the display orders
      priority: {
        type: Number,
      },
      // how should the data be rendered
      renderType: {
        type: Number,
      },
      // the data to be rendered
      data: {
        type: Object,
      },
      // image url
      image: {
        type: String,
      },
      // should we display this slide?
      hide: {
        type: Boolean,
        default: false,
      },
      // who created that entry?
      creator: {
        type: String,
        default: 'unknown',
      },
    },
    { timestamps: true }
  );

  return mongoose.model('slide', slideSchema);
};
