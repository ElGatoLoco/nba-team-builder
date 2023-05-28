import type { FC } from 'react';

import { Children } from '../types';

type Props = {
  children: Children;
};
export const combineComponents = (...components: FC<Props>[]): FC<Props> => {
  return components.reduce<FC<Props>>(
    (AccumulatedComponents, CurrentComponent) => {
      const CombinedComponents: FC<Props> = ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      return CombinedComponents;
    },
    ({ children }: Props) => <>{children}</>,
  );
};
