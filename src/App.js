import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	shelves = {
		currentlyReading: `Currently Reading`,
		wantToRead: `Want to Read`,
		read: `Read`
	}

	componentDidMount() {
		this.fetchBooks()
	}

	fetchBooks = () => {
		BooksAPI.getAll().then((books) => this.setState({books}))
	}

	changeShelf = (id, shelf) => {
		BooksAPI.update({
			id
		}, shelf).then(() => {
			this.fetchBooks()
		})
	}

	render() {
		{/* BooksAPI.getAll().then((response) => console.log(response)) */}
		return (
				<div className="app">
					<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>

				<Route exact path='/search' render={() => (
					<div className="search-books">
						<div className="search-books-bar">
							<a className="close-search" href="/">Close</a>
							<div className="search-books-input-wrapper">
								{/*
									NOTES: The search from BooksAPI is limited to a particular set of search terms. https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
								*/
								}
								<input type="text" placeholder="Search by title or author"/>
							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>
				)}/>

				<Route path='/' render={() => (
						<div className="list-books-content">
						{
						Object.keys(this.shelves).map((shelf, i)=> (
								<ListBooks
										key={i}
										books={this.state.books}
										shelfTitle={this.shelves[shelf]}
										currentShelf={shelf}
										onBookChange={this.changeShelf}
								/>
						))
						}
					 </div>
				)}/>


				<div className="open-search">
				<Route exact path='/' render={() => (
						<a href="/search">Add a book</a>
				)}/>
				<Route exact path='/search' render={() => (
						<a href="/">Add a book</a>
				)}/>
				</div>

				</div>
			</div>
		)
	}
}


export default BooksApp
