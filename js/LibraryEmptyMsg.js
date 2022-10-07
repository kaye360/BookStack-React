export default function LibraryEmptyMsg() {


    const addSomeBooksString = JSON.stringify([{"title":"Disposable","author":"Sean Cliver","pages":237,"image":"http://books.google.com/books/content?id=SR8mcgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"1584233788","read":true,"date":1665109967381,"id":"4489dc238d172"},{"title":"Cosmos","author":"Carl Sagan","pages":450,"image":"http://books.google.com/books/content?id=cDKODQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","isbn":"9780345539434","read":true,"date":1665110188768,"id":"c96552db24114"},{"title":"Son of Elsewhere","author":"Elamin Abdelmahmoud","pages":280,"image":"http://books.google.com/books/content?id=NAqazgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"9780771002229","read":true,"date":1665115224834,"id":"fca57667e9c8d"},{"title":"The Bad Guys in Open Wide and Say Arrrgh! (the Bad Guys #15)","author":"Aaron Blabey","pages":192,"image":"http://books.google.com/books/content?id=4T6WzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"9781338813180","read":true,"date":1665115231946,"id":"bec89d8d6c347"},{"title":"Firestarter","author":"Stephen King","pages":512,"image":"http://books.google.com/books/content?id=hC9qEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","isbn":"9781668009925","read":true,"date":1665115235882,"id":"e7bb77bb5075b"},{"title":"The Origin of Species","author":"Charles Darwin","pages":495,"image":"http://books.google.com/books/content?id=k84AwQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"0451529065","read":true,"date":1665115276894,"id":"533f0375bf7d7"},{"title":"A Brief History of Time","author":"Stephen Hawking","pages":198,"image":"http://books.google.com/books/content?id=BdEPAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"055305340X","read":true,"date":1665115318615,"id":"4c1d147690014"},{"title":"The Skin We're In","author":"Desmond Cole","pages":258,"image":"http://books.google.com/books/content?id=ZX3HDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","isbn":"038568634X","read":true,"date":1665115383770,"id":"3067e45e8bf9b"},{"title":"The Myth of Normal","author":"Gabor Maté","pages":560,"image":"http://books.google.com/books/content?id=0f-KzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"0735278369","read":true,"date":1665116434269,"id":"26b848b5850d5"},{"title":"Fairy Tale","author":"Stephen King","pages":608,"image":"http://books.google.com/books/content?id=jPzjzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","isbn":"1668002175","read":true,"date":1665116444655,"id":"ccfdb7b444207"}])


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