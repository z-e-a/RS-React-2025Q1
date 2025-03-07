import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Layout from '@/pages/layout';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => ({
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke+Skywalker';
        if (param == 'text') return 'test';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('id', '1', 0);
        callbackFn('name', 'Luke+Skywalker', 1);
        callbackFn('text', 'test', 2);
      },
    }),
  };
});

const mockedRouterPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/compat/router');
  return {
    ...actual,
    useRouter: () => ({
      push: mockedRouterPush,
    }),
  };
});

function Dummy() {
  return <div>test</div>;
}

describe('Layout component', () => {
  test('should render Layout component', async () => {
    render(
      <Layout>
        <Dummy />
      </Layout>
    );

    const dummyText = screen.getByText('test');
    expect(dummyText).toBeDefined();
  });

  vi.clearAllMocks();
});
