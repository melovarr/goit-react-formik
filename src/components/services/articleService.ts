import axios from "axios";
import type { Article } from "../../types/article";

interface ArticleHttpResponse {
  hits: Article[];
  nbPages: number;
}

export const fetchArticles = async (topic: string, page: number) => {
  const response = await axios.get<ArticleHttpResponse>(
    "https://hn.algolia.com/api/v1/search",
    {
      params: {
        query: topic,
        page,
      },
    }
  );
  return response.data;
};
