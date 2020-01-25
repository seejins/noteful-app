import React, { Component } from 'react'
import NotesContext from '../NotesContext'
import config from '../config'
import './AddFolder.css'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types'

class AddFolder extends Component {
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
                touched: 'false'
            }
        }
    }

    static contextType = NotesContext

    handleSubmit = e => {
        e.preventDefault()
        const folder ={
            folder_name: e.target['folder-name'].value
        }
        fetch(`${config.API_ENDPOINT}/api/folders`, {
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

    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    validateFolderName() {
        const name = this.state.name.value.trim()
        if(name.length === 0) {
            return 'Folder name is required.'
        } else if (name.length > 20) {
            return 'Folder name must be less than 20 characters'
        }
    }

    render() {
        const folderError = this.validateFolderName()
        console.log('addfolder', this.props)
        return (
            <section className='AddFolder'>
                <h2>Create a folder</h2>
                <form className='folder-form' action='#' onChange={e => this.updateName(e.target.value)} onSubmit={this.handleSubmit}>
                    <div className ='field'>
                        <label htmlFor='folder-name'>
                            Name
                        </label>
                        <input type='text' id='folder-name' name='folder-name' aria-label="folder name"/>
                        {this.state.name.touched === true && <ValidationError message={folderError}/>}
                        {console.log(this.state)}
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='button' disabled={this.validateFolderName()}>
                            Add Folder
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

AddFolder.propTypes = {
    requiredObjectWithShape: PropTypes.shape({
        history: PropTypes.func.isRequired
    })
}

export default AddFolder