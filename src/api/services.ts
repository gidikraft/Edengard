import { NotificationResponse, UsersResponse } from "@/types/";
import { api } from "./api";

// Define a service using a base URL and expected endpoints
export const servicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, string>({
      query: (name) => `${name}`
    }),
    getNotifications: builder.query<NotificationResponse, string>({
      query: (name) => `${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotificationsQuery, useGetUsersQuery } = servicesApi;
