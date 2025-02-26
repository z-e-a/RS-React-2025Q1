import App from '@/pages/_app';
import { render, screen } from '@testing-library/react';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import { Router } from 'next/router';
import { describe, expect, test, vitest } from 'vitest';
// import type { ParsedUrlQuery } from 'querystring';
// import App from '@/pages/layout';

vitest.mock(import('next/navigation'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: vitest.fn(),
  };
});

function Dummy() {
  return <div>test</div>;
}

const query: NodeJS.Dict<string | string[]> = {};
// new NodeJS.Dict<
//   string | string[]
// >('');
const props = {
  subscription: () => new Promise<void>(() => {}),
  initialProps: null,
  pageLoader: null,
  Component: Dummy,
  App: App as AppComponent,
  wrapApp: () => {},
  isFallback: false,
};

describe('Layout component', () => {
  test('should render Layout component', async () => {
    render(
      <App
        pageProps={undefined}
        Component={Dummy}
        router={new Router('/search', query, '', props)}
      />
    );

    const header = await screen.findAllByRole('heading');
    // const header = await screen.findByTestId('app-header');
    // const form = await screen.findByTestId('form-search');
    // const searchInput = await screen.findByTestId('search-input');
    // const buttonSearch = await screen.findByTestId('search-btn');
    // const buttonThemeToggle = await screen.findByTestId('button-theme-toggle');
    // const flyoutElement = await screen.findByTestId('flyout-article');

    expect(header).toBeInTheDocument();
    // expect(header).toBeInTheDocument();
    // expect(form).toBeInTheDocument();
    // expect(searchInput).toBeInTheDocument();
    // expect(buttonSearch).toBeInTheDocument();
    // expect(buttonThemeToggle).toBeInTheDocument();
    // expect(flyoutElement).toBeInTheDocument();
  });
});
