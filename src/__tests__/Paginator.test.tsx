import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Paginator from '../components/Paginator';
import styles from '../components/Paginator/ui/Paginator.module.scss';
import { ThemeContext, ThemeContextType } from '@/ThemeContext';
import { PagingContext, PagingContextType } from '@/PagingContext';
// import { renderWithProviders } from './test-utils';
// import { ThemeContext } from '../app/Contexts';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import * as actions from '../entities/people/model/peopleViewSlice';

const mocketRouterPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    // ...(await vi.importActual('next/navigation')),
    ...actual,
    // useNavigate: () => mockedUseNavigate,
    // useRouteError: () => mockedUseRouteError,
    // isRouteErrorResponse: () => mockedIsRouteErrorResponse,
    useRouter: () => ({
      // ...useSearchParams,
      // ...actual.useSearchParams,
      push: mocketRouterPush,
    }),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    // ...(await vi.importActual('next/navigation')),
    ...actual,
    // useNavigate: () => mockedUseNavigate,
    // useRouteError: () => mockedUseRouteError,
    // isRouteErrorResponse: () => mockedIsRouteErrorResponse,
    useSearchParams: () => ({
      // ...useSearchParams,
      // ...actual.useSearchParams,
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke+Skywalker';
        if (param == 'text') return 'test';
        if (param == 'page') return '2';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('id', '1', 0);
        callbackFn('name', 'Luke+Skywalker', 1);
        callbackFn('text', 'test', 2);
        callbackFn('page', '2', 3);
      },
    }),
  };
});

describe('Paginator tests', () => {
  test('Render Paginator without crash', async () => {
    // const component = renderWithProviders(
    //   <ThemeContext.Provider value={'light'}>
    //     <MemoryRouter
    //       initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=i']}
    //     >
    //       <Routes>
    //         <Route path="*" element={<Paginator />} />
    //       </Routes>
    //     </MemoryRouter>
    //   </ThemeContext.Provider>,
    //   {
    //     preloadedState: {
    //       peopleView: {
    //         currentPage: 2,
    //         totalItemsCount: 51,
    //         selectedPeople: [],
    //         searchText: '',
    //       },
    //     },
    //   }
    // );

    const lightThemeContextValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: () => {},
    };
    // const darkThemeContextValue: ThemeContextType = {
    //   theme: 'dark',
    //   toggleTheme: () => {},
    // };

    const pagingContextValue: PagingContextType = {
      totalItemsCount: 51,
      setTotalsCount: vi.fn(),
    };

    const component = render(
      <PagingContext.Provider value={pagingContextValue}>
        <ThemeContext.Provider value={lightThemeContextValue}>
          <Paginator />
        </ThemeContext.Provider>
      </PagingContext.Provider>
    );

    const link = screen.getByTestId('paginator');
    expect(link.classList).toContain(styles.light);

    const secondBnt = screen.getByText('2');
    const nextBnt = screen.getByRole('button');
    expect(secondBnt).toBeInstanceOf(HTMLAnchorElement);
    expect(secondBnt.classList).toContain(styles.currentPageButton);
    expect(nextBnt.textContent).toMatch('>');

    await fireEvent.click(nextBnt);

    const sixthBnt = screen.getByText('6');
    expect(sixthBnt).toBeDefined();

    const prevBnt = screen.getByRole('button');
    expect(prevBnt.textContent).toMatch('<');

    await fireEvent.click(prevBnt);

    // const firstBnt = screen.getByText('1');

    // const mockedSelectFirstPage = vi.spyOn(actions, 'setCurrentPage');

    // await fireEvent.click(firstBnt);
    // expect(firstBnt.classList).toContain(styles.currentPageButton);

    // expect(mockedSelectFirstPage).toHaveBeenCalledWith({ currentPage: 1 });

    component.unmount();
  });
});
