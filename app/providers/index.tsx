'use client';

import  { FC, useState } from 'react';
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Providers: FC<ThemeProviderProps> = ({ children, ...themeProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      }),
  );

  return (
    <HeroUIProvider>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider basePath={process.env.API_BASE_PATH + "/api/auth"}>{children}</SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
