const baseUrls = {
  placeholders: "https://jsonplaceholder.typicode.com/",
};

export type BaseUrlType = keyof typeof baseUrls;

export const getBaseUrl = (type: keyof typeof baseUrls) => baseUrls[type];
