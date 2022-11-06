import React, { useEffect } from 'react';
import { initFirebase } from '@lib/firebase/client';

export const FirebaseProvider: React.FC = ({ children }) => {
  useEffect(() => {
    initFirebase();
  }, []);

  return <>{children}</>;
};
