import React from "react";
import NewNote from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/note";
import { redirect } from "@remix-run/node";
import { isRouteErrorResponse, json, useLoaderData } from "@remix-run/react";
import NoteList from "../components/NoteList";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "No notes found" }
    )
  }

  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();

  // const noteData = {
  //     title: formData.get('title'),
  //     content: formData.get('content'),
  // }

  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Title must be at least 5 characters long" };
  }
  if (noteData.content.trim().length < 5) {
    return { message: "Content must be at least 5 characters long" };
  }

  const existingNotes = await getStoredNotes();
  console.log(existingNotes);
  noteData.id = existingNotes.length + 1;
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return redirect("/notes");
}

export function ErrorBoundary() {

  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main>
         <NewNote />
        <p>{error.data.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>An error occurred!</h1>
      <p>Sorry something went wrong</p>
      <p>Back to <Link to="/">safety</Link></p>
    </main>
  );
}
