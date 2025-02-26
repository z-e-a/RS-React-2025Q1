import Flyout from '@/components/Flyout';
import Paginator from '@/components/Paginator';
import PeopleList from '@/components/PeopleList';
import PersonDetail from '@/components/PersonDetail';
import { PagingContext } from '@/PagingContext';
import { IPeople } from '@/SWApi';
import { GetServerSideProps } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';

export interface IPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}

export const getServerSideProps = (async (context) => {
  const searchText = context.query.text ?? '';
  const currentPage = context.query.page ?? '1';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/people?search=${searchText}&page=${currentPage}`
  );
  const json: IPeopleResponse = await res.json();
  return { props: json };
}) satisfies GetServerSideProps<{ count: number; results: IPeople[] }>;

export default function Search(props: { count: number; results: IPeople[] }) {
  const pagingState = useContext(PagingContext);

  const searchParams = useSearchParams();
  const searchText = searchParams.get('text') || '';

  const router = useRouter();

  useEffect(() => {
    if (pagingState?.setTotalsCount) {
      pagingState.setTotalsCount(props.count);
    }

    if (searchText) {
      window.localStorage.setItem(
        `${process.env.NEXT_PUBLIC_APP_PREFIX}searchText`,
        JSON.stringify(searchText)
      );
    } else {
      const item = window.localStorage.getItem(
        `${process.env.NEXT_PUBLIC_APP_PREFIX}searchText`
      );
      if (item) {
        const value = JSON.parse(item) ?? '';
        router.replace(`/search?text=${value}`);
      }
    }
  }, [searchText, pagingState, router]);

  return (
    <>
      <Paginator />
      <PeopleList people={props.results}>
        <PersonDetail />
      </PeopleList>
      <Flyout />
    </>
  );
}
