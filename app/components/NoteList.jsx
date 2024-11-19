import React from 'react'

export default function NoteList({notes}) {
  return (
    <div>
        <ul>
            {notes.map((note) => (
                <li key={note.id}>
                    <h2>{note.id}</h2>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
