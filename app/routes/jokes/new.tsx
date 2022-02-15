import { Button, Container, Paper, Text, Textarea, TextInput } from "@mantine/core";
import { ActionFunction, json, redirect, useActionData } from "remix";
import { db } from "~/utils/db.server";

function validateJokeContent(content: string) {
  if (content.length < 3) {
    return "Joke content must be at least 3 characters long";
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return "Joke's name must be at least 3 characters long";
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name?: string;
    content?: string;
  };
  fields?: {
    name: string;
    content: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  if (typeof name !== "string" || typeof content !== "string") {
    return badRequest({ formError: "Missing name or content" });
  }
  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };
  const fields = { name, content };
  if (Object.values(fieldErrors).some((error) => error !== undefined)) {
    return badRequest({ fieldErrors, fields });
  }
  const joke = await db.joke.create({ data: fields });
  return redirect(`${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <Container>
      <Paper padding={"xs"}>
        <Text>Add your own hilarious joke</Text>
      </Paper>
      <form method="post">
        <Paper padding={"xs"}>
          <TextInput
            name="name"
            placeholder="Name"
            label="Name"
            required
            error={actionData?.fieldErrors?.name ? actionData.fieldErrors.name : null}
          />
        </Paper>
        <Paper padding={"xs"}>
          <Textarea
            name="content"
            placeholder="Your content"
            label="Your content"
            required
            error={actionData?.fieldErrors?.content ? actionData.fieldErrors.content : null}
          />
        </Paper>
        <Paper padding={"xs"}>
          <Button type="submit">Submit</Button>
        </Paper>
      </form>
    </Container>
  );
}
