'use client';

import { useMutation as useTanStackMutation, UseMutationOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

type MutationFnParams<TVariables> = {
  body?: TVariables;
  path?: string;
};

const useMutation = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, MutationFnParams<TVariables>>, 'mutationFn'> & {
    method?: string;
  },
) => {
  const session = useSession();
  const apiToken = session?.data?.user?.apiToken;

  return useTanStackMutation<TData, Error, MutationFnParams<TVariables>>({
    mutationFn: async ({ body, path }: MutationFnParams<TVariables>) => {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (apiToken) {
        headers.Authorization = apiToken;
      }

      const fullPath = process.env.API_BASE_PATH + (path ?? url);
      const response = await fetch(fullPath, {
        headers,
        body: body ? JSON.stringify(body) : undefined,
        method: options?.method ?? 'POST',
      });

      if (!response.ok) {
        toast.error(`Network response was not ok: ${await response.text()}`);
        throw new Error(`Network response was not ok: ${await response.text()}`);
      }

      return response.json();
    },
    ...options,
  });
};

export default useMutation;
