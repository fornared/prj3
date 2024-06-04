import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <Box>
      <Box>navbar</Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
