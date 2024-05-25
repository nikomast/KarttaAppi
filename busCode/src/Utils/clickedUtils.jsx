import { useContext } from 'react';
import { ClickedContext } from '../Contexts/ClickedContext';

export const useClicked = () => {
  return useContext(ClickedContext);
};
