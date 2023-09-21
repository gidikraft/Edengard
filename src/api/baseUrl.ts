const baseUrls = {
  placeholders: "https://jsonplaceholder.typicode.com/",
  news: "https://newsapi.org/v2",
};

export type BaseUrlType = keyof typeof baseUrls;

export const getBaseUrl = (type: keyof typeof baseUrls) => baseUrls[type];
