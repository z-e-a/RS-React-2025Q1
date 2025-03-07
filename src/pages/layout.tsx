import Header from '@/components/Header';
import Wrapper from '@/components/Wrapper';
import { Providers } from '@/providers';
import React from 'react';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Wrapper>
        <Header />
        <main>{children}</main>
      </Wrapper>
    </Providers>
  );
}
