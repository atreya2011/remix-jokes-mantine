import { Button, Container, Paper, Text, Textarea, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  console.log(name, content);
  if (typeof name !== "string" || typeof content !== "string") {
    throw new Error("Invalid form data");
  }
  const fields = { name, content };
  const joke = await db.joke.create({ data: fields });
  return redirect(`${joke.id}`);
};

export default function NewJokeRoute() {
  return (
    <Container>
      <Paper padding={"xs"}>
        <Text>Add your own hilarious joke</Text>
      </Paper>
      <form method="post">
        <Paper padding={"xs"}>
          <TextInput name="name" placeholder="Name" label="Name" required />
        </Paper>
        <Paper padding={"xs"}>
          <Textarea name="content" placeholder="Your comment" label="Your comment" required />
        </Paper>
        <Paper padding={"xs"}>
          <Button type="submit">Submit</Button>
        </Paper>
      </form>
    </Container>
  );
}
