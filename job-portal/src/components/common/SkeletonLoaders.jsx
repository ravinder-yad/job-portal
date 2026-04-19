import React from 'react';
import { Skeleton, Box, Card, Stack } from '@mui/material';

/**
 * JobCardSkeleton - Mimics the structure of a premium job card
 */
export const JobCardSkeleton = () => (
  <Card className="p-4 mb-4 border border-gray-100 shadow-sm rounded-xl">
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Skeleton variant="rounded" width={48} height={48} className="rounded-lg" />
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
      </Box>
    </Stack>
    <Box className="mt-4">
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />
    </Box>
    <Stack direction="row" spacing={1} className="mt-4">
      <Skeleton variant="rounded" width={80} height={28} />
      <Skeleton variant="rounded" width={80} height={28} />
      <Skeleton variant="rounded" width={80} height={28} />
    </Stack>
    <Box className="mt-4 flex justify-between items-center">
      <Skeleton variant="text" width={100} />
      <Skeleton variant="circular" width={32} height={32} />
    </Box>
  </Card>
);

/**
 * DashboardSkeleton - Mimics the overview stats and recent activity
 */
export const DashboardSkeleton = () => (
  <Box className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 rounded-2xl shadow-sm border-none bg-white">
          <Skeleton variant="circular" width={40} height={40} className="mb-4" />
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="60%" />
        </Card>
      ))}
    </div>
    <Card className="p-6 rounded-2xl shadow-sm border-none bg-white">
      <Skeleton variant="text" width="30%" height={32} className="mb-4" />
      <Stack spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Stack key={i} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="30%" />
            </Box>
            <Skeleton variant="rounded" width={80} height={32} />
          </Stack>
        ))}
      </Stack>
    </Card>
  </Box>
);

/**
 * CompanyCardSkeleton - For the companies listing page
 */
export const CompanyCardSkeleton = () => (
  <Card className="p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
    <Skeleton variant="circular" width={80} height={80} className="mb-4" />
    <Skeleton variant="text" width="70%" height={28} />
    <Skeleton variant="text" width="40%" className="mb-4" />
    <Stack direction="row" spacing={2} className="w-full">
      <Skeleton variant="rounded" width="50%" height={36} />
      <Skeleton variant="rounded" width="50%" height={36} />
    </Stack>
  </Card>
);
