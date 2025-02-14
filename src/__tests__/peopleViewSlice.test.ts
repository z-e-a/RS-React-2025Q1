import { describe, expect, test } from 'vitest';
import {
  peopleViewReducer,
  setTotalItemsCount,
  togglePeopleSelection,
} from '../entities/people/model/peopleViewSlice';

import { testSinglePerson } from './mockData';

const preloadedState = {
  currentPage: 1,
  totalItemsCount: 1,
  selectedPeople: [],
  searchText: 'test',
};

describe('peopleViewSlice tests', () => {
  test('setTotalItemsCount', () => {
    const action = setTotalItemsCount({ totalItemsCount: 2 });

    const result = peopleViewReducer(preloadedState, action);

    expect(String(result.totalItemsCount)).toMatch('2');
  });

  test('togglePeopleSelection', () => {
    const action = togglePeopleSelection({ people: testSinglePerson });

    const result = peopleViewReducer(preloadedState, action);

    expect(result.selectedPeople[0].name).toMatch('Luke Skywalker');
  });
});
