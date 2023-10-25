import { client } from "../utils/api-client";

const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const articleService = {
  getAllArticle: async ({ currentPage }) => {
    try {
      const url = `${serverUrl}/article?page=${currentPage}`;

      const method = "GET";
      const response = await client(url, method);
      if (!response) throw new Error("Cannot fetch articles");
      return response;
    } catch (e) {
      throw e;
    }
  },

  singleArticle: async ({ id }) => {
    try {
      const url = `${serverUrl}/article/${id}`;

      const method = "GET";
      const response = await client(url, method);
      if (!response) throw new Error("Cannot fetch article");
      return response;
    } catch (e) {
      throw e;
    }
  },

  sideBar: async () => {
    try {
      const url = `${serverUrl}/article?limit=10`;

      const method = "GET";
      const response = await client(url, method);
      if (!response) throw new Error("Cannot fetch article");
      return response;
    } catch (e) {
      throw e;
    }
  },
  frontPageArticle: async () => {
    try {
      const url = `${serverUrl}/article?limit=3`;

      const method = "GET";
      const response = await client(url, method);
      if (!response) throw new Error("Cannot fetch article");
      return response;
    } catch (e) {
      throw e;
    }
  },
};
