import React, {Component} from 'react'
import PropTypes from 'prop-types'

let coverUrl, curShelf, match

class SearchResults extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		book: PropTypes.object.isRequired,
		onBookChange: PropTypes.func
	}

	render() {
		const {books, book, onBookChange} = this.props

		match = books.filter(b => b.title === book.title)
		match.length > 0 ? curShelf = match[0].shelf : curShelf = "none"

		book.imageLinks !== undefined ? coverUrl = book.imageLinks.thumbnail : coverUrl = "img/unavailable.png"
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
							width: 128,
							height: 193,
							backgroundImage: `url("${coverUrl}")`
						}}>
					</div>
					<div className="book-shelf-changer">
						<select onChange={(event) => onBookChange(book.id, event.target.value)} value={curShelf}>
							<option value="mt" disabled="disabled">Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title"><a href={book.infoLink} target="_blank">{book.title} {book.shelf}</a></div>
				<div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
			</div>
			)
	}
}

export default SearchResults
