import React, { Component } from 'react'
import NotesContext from '../NotesContext'
import config from '../config'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types'
import './AddNote.css'


class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    constructor(props) {
        super(props) 
        this.state = {
            name: {
                value: '',
                touched: 'false',
            },
            content: {
                value: '',
                touched: 'false'
            },
            folder: {
                touched: 'false'
            }
        }
    }

    static contextType = NotesContext

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            note_name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folder_id: e.target['note-folder-id'].value,
            modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/api/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(note => {
                this.context.addNote(note)
                this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }

    validateNoteName() {
        const name = this.state.name.value.trim()
        if(name.length === 0) {
            return 'Note name is required.'
        } else if (name.length > 20) {
            return 'Folder name must be less than 20 characters'
        }
    }

    validateContent() {
        const content = this.state.content.value.trim()
        if(content.length === 0) {
            return 'Note content cannot be empty.'
        }
    }

    render() {
        const { folders = [] } = this.context
        return (
            <section className='AddNote'>
                <h2>Create a Note</h2>
                <form className='note-form' action='#' onSubmit={this.handleSubmit} >
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            Name
                        </label>
                        <input type='text' id='note-name-input' name='note-name' aria-label="note name" onChange={e => this.updateName(e.target.value)}/>
                        {this.state.name.touched === true && <ValidationError message={this.validateNoteName()}/>}
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content'>
                            Content
                        </label>
                        <textarea id='note-content' name='note-content' aria-label="note contents" onChange={e => this.updateContent(e.target.value)}/>
                        {this.state.content.touched === true && <ValidationError message={this.validateContent()}/>}
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select id='note-folder-select' name='note-folder-id' aria-label="Select folder to place note" required>
                            <option value={null}>Select Folder</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                    {folder.folder_name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='button' disabled={this.validateContent() || this.validateNoteName()}>
                            Add Note
                        </button>
                    </div>
                </form>
            </section>

        )
    }

}

AddNote.propTypes = {
    requiredObjectWithShape: PropTypes.shape({
        history: PropTypes.func.isRequired
    })
}

export default AddNote