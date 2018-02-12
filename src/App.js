import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchResults from './Search'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
	state = {
		books: [],
		query: [],
		searchTerm: "",
		gotResults: false,
		hideResults: "none"
	}

	shelves = {
		currentlyReading: `Currently Reading`,
		wantToRead: `Want to Read`,
		read: `Read`
	}

	componentDidMount() {
		this.fetchBooks()
	}

	searchQuery = (searchTerm) => {
		this.setState({searchTerm})

		if (searchTerm.length > 0 && searchTerm.length !== undefined) {
			BooksAPI.search(searchTerm, 20).then((query) =>
				query.length > 0 && query.length !== undefined ? (
					this.setState({query}),
					this.setState({gotResults: true}),
					this.setState({hideResults: "flex"})
				) : (
					this.setState({gotResults: false}),
					this.setState({hideResults: "none"})
				)
			)
		}
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
								<input
									type="text"
									placeholder="Search by title or author"
									onChange={event => this.searchQuery(event.target.value)}
								/>
						</div>
						</div>
						<div className="search-books-results">
							<h2 className="search-header">{this.state.gotResults === true ? (
								`Search Results (${this.state.query.length})`
							) : (
								`No Results Found`
							)}
							</h2>
							<ol className="books-grid" style={{
									display: this.state.hideResults
								}}>
							{
								this.state.query.map((result, i)=> (
									<li key={i}>
									<SearchResults
										book={result}
										onBookChange={this.changeShelf}
									/>
									</li>
								))
							}
							</ol>
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
				<Route path='/' render={() => (
						<a href="/search">Add a book</a>
				)}/>
				</div>

				</div>
			</div>
		)
	}
}


export default BooksApp
