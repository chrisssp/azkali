import React from 'react';
import { Box } from '@/components/ui/box';
import type { ViewProps } from 'react-native';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Box className={`flex-1 bg-background-50 ${className || ''}`} {...props}>
      {children}
    </Box>
  );
};
