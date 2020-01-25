import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom'
import Main from './Main/Main'
import MainSidebar from './MainSidebar/MainSidebar'
import FolderMain from './FolderMain/FolderMain'
import NoteMain from './NoteMain/NoteMain'
import NoteSidebar from './NoteSidebar/NoteSidebar'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import NotesContext from './NotesContext'
import config from './config'
import ErrorBoundary from './ErrorBoundary'
import './App.css'


class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })

  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  getMainRoute() {
    const { notes } = this.state
    return (
      <>

        <Route
          exact path='/'
          key='/'
          component={Main}
        />

        <Route
          exact path='/folder/:folderId'
          key='/folder/:folderId'
          component={FolderMain}
        />

        <Route
          exact path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = notes.find(note => note.id == noteId)
            return <NoteMain {...routeProps} note={note} />
          }}
        />

        <Route
          exact path='/add-folder'
          component={AddFolder}
        />

        <Route
          exact path='/add-note'
          component={AddNote}
        />

      </>
    )

  }

  getSidebarRoute() {

    return (
      <>
        <Route
          exact path='/'
          key='/'
          component={MainSidebar}
        />

        <Route
          exact path='/folder/:folderId'
          key='/folder/:folderId'
          component={MainSidebar}
        />

        <Route
          exact path='/note/:noteId'
          component={NoteSidebar}
        />

        <Route
          exact path='/add-folder'
          component={NoteSidebar}
        />

        <Route
          exact path='/add-note'
          component={NoteSidebar}
        />

      </>
    )
  }


  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder
    }

    return (
      <Fragment>
        <div className="App">

          <header className="App-header">
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <NotesContext.Provider value={contextValue}>
            <ErrorBoundary>
            <nav className="App-nav">
              {this.getSidebarRoute()}
            </nav>
            </ErrorBoundary>

            <ErrorBoundary>
            <main className="App-main">
              {this.getMainRoute()}
            </main>
            </ErrorBoundary>

          </NotesContext.Provider>
        </div>
      </Fragment>
    );
  }
}

export default App;
