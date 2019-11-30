import React, { Component } from 'react'
import NotesContext from '../NotesContext'
import config from '../config'
import './AddFolder.css'

class AddFolder extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    static contextType = NotesContext

    handleSubmit = e => {
        e.preventDefault()
        const folder ={
            name: e.target['folder-name'].value
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push(`/folder/${folder.id}`)
            })
            .catch(error => {
                console.error({error})
            })
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Create a folder</h2>
                <form className='folder-form' action='#' onSubmit={this.handleSubmit}>
                    <div className ='field'>
                        <label htmlFor='folder-name'>
                            Name
                        </label>
                        <input type='text' id='folder-name' name='folder-name'/>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='button'>
                            Add Folder
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default AddFolder