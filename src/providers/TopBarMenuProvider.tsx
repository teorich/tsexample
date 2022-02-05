import React, {useState, useContext} from 'react';

const TopBarMenyContext = React.createContext<any>(null);

const TopBarMenuProvider = ({children}: any) => {
  const [menu, setMenu] = useState<[]>([]);

  return (
    <TopBarMenyContext.Provider
      value={{
        setMenu,
        menu,
      }}>
      {children}
    </TopBarMenyContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTopBarMenu = () => {
  const menu = useContext(TopBarMenyContext);
  if (menu == null) {
    throw new Error('useTopBarMenu() called outside of a TopBarMenuProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return menu;
};

export {TopBarMenuProvider, useTopBarMenu};
