import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { IPeople } from '../../../SWApi';

export const peopleDetailLoader: LoaderFunction<unknown> = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL((request as unknown as Record<string, string>).url);

  if (url) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${url.searchParams.get('id')}`
    );
    const person: IPeople = await response.json();

    return person;
  } else {
    return null;
  }
};
