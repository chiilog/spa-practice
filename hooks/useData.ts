import useSWR from "swr";
import axios from "axios";

export const useData = (api: string) => {
  const fetcher = (url: string) =>
    axios(url, {
      headers: { "X-API-KEY": `${process.env.NEXT_PUBLIC_RESAS_API_KEY}` },
    }).then((res) => {
      if (res.data.statusCode === "403" || res.data.statusCode === "404") {
        return [];
      }

      return res.data.result;
    });
  const { data, error } = useSWR(api, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
