import React, {Component} from 'react'
import PropTypes from 'prop-types'

let coverUrl

class SearchResults extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		onBookChange: PropTypes.func
	}

	render() {
		const {book, onBookChange} = this.props

		this.props.book.imageLinks !== undefined ? coverUrl = this.props.book.imageLinks.thumbnail : coverUrl = "img/unavailable.png"

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
						<select onChange={(event) => onBookChange(book.id, event.target.value)} value="mt">
							<option value="mt" disabled="disabled">Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.author}</div>
			</div>
			)
	}
}

export default SearchResults
