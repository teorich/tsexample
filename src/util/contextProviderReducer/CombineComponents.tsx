import React, {ComponentProps, FC} from 'react';

export const combineComponents = (...components: any[]): any => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({children}: any): any => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({children}) => <>{children}</>,
  );
};
