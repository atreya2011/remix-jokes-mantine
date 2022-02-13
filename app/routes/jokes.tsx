import { Container, Paper } from "@mantine/core";
import { Outlet } from "remix";

export default function JokesRoute() {
  return (
    <Container>
      <Paper padding={"xs"}>
        <h1>J🤪KES</h1>
      </Paper>
      <Outlet />
    </Container>
  );
}
