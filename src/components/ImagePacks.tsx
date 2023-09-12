const imagePacks = {
  eventBackground: require("@/assets/images/event_image.png"),
};

export { imagePacks };

export type ImagePackType = keyof typeof imagePacks;
