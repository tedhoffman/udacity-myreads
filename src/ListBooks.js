import React, {Component} from 'react'
import PropTypes from 'prop-types'

let coverUrl

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelfTitle: PropTypes.string.isRequired,
		currentShelf: PropTypes.string.isRequired,
		onBookChange: PropTypes.func
	}

	render() {
		const {books, shelfTitle, currentShelf, onBookChange} = this.props

		return (
				<div className="bookshelf">
					<h2 className="bookshelf-title">{shelfTitle}</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
							{books.filter(book => book.shelf === currentShelf).map((book, i) =>
								<li key={i}>
									<div className="book">
										<div className="book-pre">
											{book.imageLinks !== undefined ? coverUrl = book.imageLinks.thumbnail : coverUrl = "img/unavailable.png"}
										</div>
										<div className="book-top">
											<div className="book-cover" style={{
													width: 128,
													height: 193,
													backgroundImage: `url("${coverUrl}")`
												}}></div>
											<div className="book-shelf-changer">
												<select onChange={(event) => onBookChange(book.id, event.target.value)} value={currentShelf}>
													<option value="none" disabled="disabled">Move to...</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
											</div>
										</div>
										<div className="book-title"><a href={book.infoLink} target="_blank">{book.title}</a></div>
										<div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
									</div>
								</li>)}
						</ol>
					</div>
				</div>
			)
	}
}

export default ListBooks
