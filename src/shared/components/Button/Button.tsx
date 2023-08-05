import React, { ReactNode } from 'react';
import styles from './button.module.scss';
interface IProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<IProps> = ({ onClick, className, children }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
