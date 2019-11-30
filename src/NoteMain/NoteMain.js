import React from 'react'
import Note from '../Note/Note'
import PropTypes from 'prop-types'
import './NoteMain.css'



export default function NoteMain(props) {
    return (
        <section className='NoteMain'>
                <Note
                    id={props.note.id}
                    name={props.note.name}
                    modified={props.note.modified}
                />


                <div className='Note-Contents'>
                    <p>{props.note.content}</p>
                </div>
            </section>
    )
}

NoteMain.defaultProps = {
    note: {
      content: '',
      id: '',
      name: '',
    }
  }

NoteMain.propTypes = {
    note: PropTypes.object
}
