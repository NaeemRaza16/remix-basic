import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";

export default function NewNote() {
  const [showForm, setShowForm] = useState(false);
  const clickHandler = () => {
    setShowForm((prev) => !prev);
  };

  const data = useActionData()

  const navigation  = useNavigation()

  const isSubmitting = navigation.state === "submitting"

  return (
    <>
      {showForm && (
        <Form method="post">
          {data?.message && <p className="text-red-700">{data.message}</p>}
          <p>
            <label htmlFor="title" className="">
              Title
            </label>
            <input type="text" required id="title" name="title" />
          </p>
          <p>
            <label htmlFor="content">Content</label>
            <textarea rows={5} required id="content" name="content" />
          </p>
          <div>
            <button>{isSubmitting ? "Adding..." : "Add Note"}</button>
          </div>
        </Form>
      )}
      <button type="button" onClick={clickHandler}>
        Show Form
      </button>
    </>
  );
}
