import React from 'react';
import Component, { ModalProps } from './Component';

export const Modal: React.FC<ModalProps> = ({ children, title, isOpen, onClose }) => {
  return (
    <Component title={title} isOpen={isOpen} onClose={onClose}>
      {children}
    </Component>
  );
};
