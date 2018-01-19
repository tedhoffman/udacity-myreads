import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelfTitle: PropTypes.string.isRequired,
		currentShelf: PropTypes.string.isRequired,
		onBookChange: PropTypes.function
	}

	render() {
		const {books, shelfTitle, currentShelf, onBookChange} = this.props
		return (
				<div className="bookshelf">
					<h2 className="bookshelf-title">{shelfTitle}</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
							{books.filter(book => book.shelf == currentShelf).map((book, i) =>
								<li key={i}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{
													width: 128,
													height: 193,
													backgroundImage: `url("${book.imageLinks.thumbnail}")`
												}}></div>
											<div className="book-shelf-changer">
												<select onChange={(event) => onBookChange(book.id, event.target.value)}>
													<option value="none" disabled="disabled">Move to...</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">Delete</option>
												</select>
											</div>
										</div>
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.author}</div>
									</div>
								</li>)}
						</ol>
					</div>
				</div>
			)
	}
}

export default ListBooks
