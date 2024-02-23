import { useEffect, useState } from "react"

const usePromise = (cb) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await cb();
        setData(data);
        setIsError(false)
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false)
      }
    })()
  }, []);

  return [data, isLoading, isError];
}

export default usePromise