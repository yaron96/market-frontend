import { useState } from "react";
import { useQuery } from "react-query";
import { locationApi } from "shared/api/location";
import { ProductLocation } from "shared/lib/types";

export const useSearchCity = () => {
  const [query, setQuery] = useState("");
  const [options, setList] = useState<ProductLocation[]>([]);

  useQuery(
    query,
    () => {
      if (query) {
        return locationApi.searchByCity(query);
      } else {
        return [];
      }
    },
    {
      onSuccess(data) {
        setList(data);
      },
      onError() {
        setList([]);
      },
    }
  );

  return { setQuery, options };
};
