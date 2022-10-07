
export default function NavBar(props) {

    const style = {
        position : 'relative',
        zIndex : '100',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        gap : '1rem',
        padding : '1rem',
        backgroundColor : 'var(--clr-primary-dark)',
        color : '#fff',
    }
   
    return (    

        <nav className="container" style={ style }>
            { props.children }
        </nav>
    
)
}