import { Button, Container, Paper, Text, Textarea, TextInput } from "@mantine/core";

export default function NewJokeRoute() {
  return (
    <Container>
      <Paper padding={"xs"}>
        <Text>Add your own hilarious joke</Text>
      </Paper>
      <form method="post">
        <Paper padding={"xs"}>
          <TextInput placeholder="Name" label="Name" required />
        </Paper>
        <Paper padding={"xs"}>
          <Textarea placeholder="Your comment" label="Your comment" required />
        </Paper>
        <Paper padding={"xs"}>
          <Button>Submit</Button>
        </Paper>
      </form>
    </Container>
  );
}
