import { createContext } from 'react';
import { IPeople } from './SWApi';

export type SelectionContextType = {
  selectedPeople: IPeople[];
  togglePeopleSelection: ((people: IPeople) => void) | null;
  unselectAllPeople: (() => void) | null;
};

export const SelectionContext = createContext<SelectionContextType | null>(
  null
);
