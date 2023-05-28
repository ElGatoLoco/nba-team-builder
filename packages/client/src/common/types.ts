import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type ValueOf<T> = T[keyof T];
export type Children = JSX.Element | JSX.Element[];

type RadixIconProps = {
  children?: never;
  color?: string;
  className?: string;
};
export type RadixIcon = ForwardRefExoticComponent<RadixIconProps & RefAttributes<SVGSVGElement>>;
