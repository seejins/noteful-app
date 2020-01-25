import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types'
import './Note.css'



class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => { },
    }

    static contextType = NotesContext

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
                this.context.deleteNote(noteId) 
            })
            .catch(error => {
                console.error({ error })
            })
    }

    


    render() {
        const { name, id, modified } = this.props
        return (
            <>
                <div className="note">

                    <h2 className="note-title">
                        <Link to={`/note/${id}`}>
                            {name}
                        </Link>
                    </h2>

                    <div className="note-modified">
                        {modified}
                    </div>

                    <button className="note-delete" type="button" onClick={this.handleClickDelete}>
                        Delete
                    </button>
                </div>
            </>
        )
    }
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}


export default Note