import React, { ReactNode } from 'react';
import styles from './button.module.scss';
interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  dataId?: string | number;
  children?: ReactNode;
}

const Button: React.FC<IProps> = ({ onClick, className, dataId, children }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      data-id={dataId}
    >
      {children}
    </button>
  );
};

export default Button;
