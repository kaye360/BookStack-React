export default function NoBooksFoundMsg() {



    const style = {
        paddingBlock : '10rem',
        textAlign : 'center',
        fontSize : '2rem',
    }
    
    return(
        <div style={ style } className="container">
            No Books were found.  <br />
        </div>
    )
}