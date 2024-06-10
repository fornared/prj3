import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <Box>
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
