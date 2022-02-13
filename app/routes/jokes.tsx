import { Container, Paper } from "@mantine/core";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {
  jokes: {
    id: string;
    name: string;
  }[];
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokes: await db.joke.findMany(),
  };
  return data;
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <Container>
      <Paper padding={"xs"}>
        <h1>J🤪KES</h1>
        <Link to=".">Get a random joke</Link>
        <p>Here are a few more jokes to check out:</p>
        <ul>
          {data.jokes.map((joke) => (
            <li key={joke.id}>{joke.name}</li>
          ))}
        </ul>
      </Paper>
      <Outlet />
    </Container>
  );
}
