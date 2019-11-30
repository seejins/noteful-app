import React, { Component } from 'react'
import Note from '../Note/Note'
import NotesContext from '../NotesContext'
import { Link } from 'react-router-dom'
import PropType from 'prop-types'
import './FolderMain.css'


class FolderMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotesContext

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const filteredNotes = notes.filter(notes => notes.folderId === folderId);
        return (
            <>
                <ul className="Notes-List">
                    {filteredNotes.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
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

FolderMain.propTypes = {
    match: PropType.object
}

export default FolderMain