import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ClickedContext = createContext();

export const ClickedProvider = ({ children }) => {
  const [clicked, setClicked] = useState(null);

  const updateClicked = (location) => {
    setClicked(location);
  };

  return (
    <ClickedContext.Provider value={{ clicked, updateClicked }}>
      {children}
    </ClickedContext.Provider>
  );
};

ClickedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClickedContext;
