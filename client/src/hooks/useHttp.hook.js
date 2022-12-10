import { useCallback, useState } from "react";

function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      message = "Something went wrong!",
      method = "GET",
      body = null,
      headers = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json"; //Вказуємо,що передаємо JSON
        }
        const response = await fetch(url, { method, body, headers });
        const data = response.json();
        if (!response.ok) {
          console.log(data);
          throw new Error(data.message || message);
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, request, setError, clearError };
}

export default useHttp;
