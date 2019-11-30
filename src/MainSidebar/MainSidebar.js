import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import NotesContext from '../NotesContext'
import './MainSidebar.css'


class MainSidebar extends Component {

    static contextType = NotesContext

    render() {
        return (
            <section className='Main-Sidebar'>
                <ul className='Main-Sidebar-list'>
                    {this.context.folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='folder-name'
                                to={`/folder/${folder.id}`}>
                                {folder.name}
                            </NavLink>

                        </li>
                    )}

                    <div className='Add-folder-button-container'>
                        <Link
                            className='add-folder-link'
                            to={'/add-folder'}>
                            + Add Folder
                    </Link>

                    </div>
                </ul>
            </section>
        )
    }

}


export default MainSidebar