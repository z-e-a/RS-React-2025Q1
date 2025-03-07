import { useContext } from 'react';

import { ThemeContext } from '@/ThemeContext';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      className={['wrapper', themeContext.theme == 'light' ? 'light' : ''].join(
        ' '
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
