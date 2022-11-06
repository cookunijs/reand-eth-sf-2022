import { useToast as useHook, UseToastOptions } from '@chakra-ui/toast';

export const useToast = () => {
  const toast = useHook();

  return (status: UseToastOptions['status'], title: string, options?: UseToastOptions) => {
    toast({
      position: 'top',
      duration: status === 'error' ? 5000 : 3000,
      status,
      title,
      isClosable: true,
      ...options,
    });
  };
};
