import { useEffect, useState } from 'react';

type UseFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string;
};

export function useFetch<T>(url: string | null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    let ignore = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API.');
        }

        const result: T = await response.json();

        if (!ignore) {
          setData(result);
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        if (!ignore) {
          setData(null);
          setError(
            err instanceof Error ? err.message : 'Erro inesperado na requisição.'
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
}