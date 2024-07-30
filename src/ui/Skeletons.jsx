import { Box, Skeleton, Stack } from '@mui/material'

const Skeletons = () => {
    return (
        <Stack className="grid grid-cols-5 gap-x-10 gap-y-8 max-desktop:grid-cols-4 max-laptop:grid-cols-3 mr-[2.25rem] max-tablet:mr-0 max-phone:grid-cols-2 max-tablet:gap-x-[1.875rem] max-tablet:gap-y-6 max-phone:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <Box key={index}>
                    <Skeleton animation="wave" className="h-[10.875rem] max-tablet:h-[8.75rem] max-phone:h-[6.875rem] bg-semi-dark-blue" variant="rectangular" />
                    <Skeleton animation="wave" className="w-2/4 bg-semi-dark-blue" variant="text" />
                    <Skeleton animation="wave" className="w-3/4 bg-semi-dark-blue" variant="text" />
                </Box>
            ))}
        </Stack>
    )
}

export default Skeletons