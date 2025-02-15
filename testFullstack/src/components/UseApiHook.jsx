import { useMemo, useState } from "react";
import axios from "axios";

const UseApiHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async ({ url, method, data, headers, params }) => {
    try {
      setIsLoading(true);
      setData(null);
      setError(null);
      const response = await axios({ url, method, data, headers, params });
      setData(() => response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error.response || error);
    } finally {
      setIsLoading(false);
    }
  };
  const value = useMemo(
    () => ({
      data,
      error,
      isLoading,
      fetchData,
    }),
    [data, error, isLoading]
  );
  return value;
};

export default UseApiHook;
