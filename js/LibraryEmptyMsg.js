export default function LibraryEmptyMsg() {


    const addSomeBooksString = JSON.stringify({"cdbfca198c454":{"title":"Cosmos","author":"Carl Sagan","pages":396,"image":"http://books.google.com/books/content?id=cDKODQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","isbn":"9780345539434","read":true,"date":1660538136826},"e1c4110930811":{"title":"The Origin of Species","author":"Charles Darwin","pages":495,"image":"http://books.google.com/books/content?id=k84AwQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"0451529065","read":true,"date":1660538141624},"05b9e853844a8":{"title":"The Lion, the Witch and the Wardrobe (rack)","author":"C. S. Lewis","pages":224,"image":"#","isbn":"9780064471046","read":true,"date":1660538146745},"97570ae65503":{"title":"Star Wars","author":"Ann Margaret Lewis","pages":227,"image":"http://books.google.com/books/content?id=qgbrwAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"034547760X","read":true,"date":1660538152779},"47fed7aa20f89":{"title":"Disposable","author":"Sean Cliver","pages":237,"image":"http://books.google.com/books/content?id=SR8mcgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"1584233788","read":true,"date":1660538158138},"e3a750661dcad":{"title":"Tesla","author":"W. Bernard Carlson","pages":520,"image":"http://books.google.com/books/content?id=VWyYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","isbn":"0691165610","read":true,"date":1660538164393},"d8f810f9438a4":{"title":"Aristotle's \"Politics\"","author":"Aristotle","pages":315,"image":"http://books.google.com/books/content?id=OE-rMQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"0226921840","read":false,"date":1660538171742},"496cbee467c7c":{"title":"Brave New World","author":"Aldous Huxley","pages":272,"image":"http://books.google.com/books/content?id=WEhYZ9Pz2osC&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"030735654X","read":false,"date":1660538176864},"dd3ee6995400b":{"title":"Animal Farm and 1984","author":"George Orwell","pages":385,"image":"http://books.google.com/books/content?id=h1KImAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"0151010269","read":false,"date":1660538182798}})


    function addSomeBooks() {
        localStorage.setItem('bookstack', addSomeBooksString )
        window.location.reload()
    }


    const libraryEmptyMsg = {
        paddingBlock : '10rem',
        textAlign : 'center',
        fontSize : '2rem',
    }
    
    return(
        <div style={libraryEmptyMsg} className="container">
            Your Library is currently Empty. <br />

            <button onClick={ addSomeBooks }>Add some good books?</button>
        </div>
    )
}