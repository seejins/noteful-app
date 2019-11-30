import React, { Component } from 'react'
import NotesContext from '../NotesContext'
import PropType from 'prop-types'
import './NoteSidebar.css'


class NoteSidebar extends Component {
    static defaultProps= {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = NotesContext

    render() {
        
        return (
            <div className='NoteSidebar'>
                <button 
                    className='NoteSidebar-back-button' 
                    role='link' 
                    onClick={() => this.props.history.goBack()}>
                    Go Back
                </button>
            </div>
        )
    }
}

NoteSidebar.propTypes = {
    history: PropType.object,
    match: PropType.object
}

export default NoteSidebar