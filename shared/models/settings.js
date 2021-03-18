export function createSettingsSchema(mongoose) {
  // setup schema
  const settingsSchema = mongoose.Schema(
    {
      // should we only display certain tags?
      filter: {
        type: Boolean,
        default: false,
      },
      // if so, which tags should we display?
      filterTags: {
        type: [String],
        default: [],
      },
    },
    { timestamps: true, capped: { max: 1 } }
  );

  return mongoose.model('settings', settingsSchema);
}

export async function getSettings(Settings) {
  return await Settings.findOneAndUpdate(
    {},
    {},
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .lean()
    .exec()
    .catch((err) => console.error('getSettings error:', err));
}
