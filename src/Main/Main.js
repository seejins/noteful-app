import React, { Component } from 'react'
import Note from '../Note/Note'
import NotesContext from '../NotesContext';
import { Link } from 'react-router-dom'
import './Main.css'


class Main extends Component {
    static contextType = NotesContext

    render() {
        return (
            <>
                <ul className="Notes-List">
                    {this.context.notes.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.note_name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <div className='add-note-container'>
                    <Link
                        className='add-note-link'
                        to={'/add-note'}>
                        Add Note
                    </Link>
                </div>
            </>
        )
    }
}

export default Main