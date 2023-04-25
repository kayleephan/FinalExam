
import '../styles.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate   } from "react-router-dom";
 

function BookCard() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        setBooks(response.data);
        console.log("BOOKS" + books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/${id}`)
      .then((response) => {
        console.log(response);
        setBooks(books.filter((book) => book.id !== id));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
      console.log(books.length)

  return (
    <div>
      <h2>Books List</h2>
            <Link
                to='/create-book'
                className='btn btn-outline-warning float-right' 
              ><button style={{display:"block",cursor:"pointer", float:"right", padding: 10,marginRight:40, background:"darkgrey", border:"grey", color:"white"}}>
                + Add New Book
                </button></Link>
      <button style={{float:"center",borderRadius:10, border:"black", padding:10, background:"orange"}}>{books.length}</button>
      {books.map((book) => (
        <div class="card-container" key={book.id}>
          <img
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
            alt="Books"
            height="200"
          />
          <div class="desc">
            {console.log("BOOK ID " + book._id)}
            <h2 >{book.title}</h2>
            <h3 >{book.author}</h3>
            <p style={{float:"left"}}>{book.description}</p>
            <button style={{float:"right", display:"inline", marginTop:18}} onClick={() => handleDelete(book._id)}>X</button>
          </div>                               
        </div>
      ))}
    </div>
  );
}



function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error from BookList');
      });
  }, []);

  const bookList =
    books.length === 0
      ? 'there is no book record!'
      : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div className='BookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Books List</h2>
          </div>
          <div>{books.length}</div>
          <div className='col-md-11'>
            <button>
            <Link
                to='/create-book'
                className='btn btn-outline-warning float-right'
              >
                + Add New Book
              </Link></button>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default BookCard;