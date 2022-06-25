import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setIsError(null);

    //get and post
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("LMAO WE MESSED UP OUR BACKEND");
      }

      const data = await response.json();
      applyData(data);
    } catch (error) {
      setIsError(error.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
