import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_API_KEY!}`,
  },
});
