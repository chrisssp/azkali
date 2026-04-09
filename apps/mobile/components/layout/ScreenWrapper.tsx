import React from 'react';
import { Box } from '@/components/ui/box';
import type { ViewProps } from 'react-native';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  header,
  className,
  ...props
}) => {
  return (
    <Box className={`flex-1 bg-background-50 ${className || ''}`} {...props}>
      {header}
      <Box className="px-4 pt-4 pb-0 flex-1">
        {children}
      </Box>
    </Box>
  );
};
