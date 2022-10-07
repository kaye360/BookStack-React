
import { menuCloseIcon } from "../img"

export default function UserSettings(props) {

    const { viewMethod, setViewMethod, sortMethod, setSortMethod, readFilter, setReadFilter, setActiveMenuItem } = props


    const style = {
        marginBottom : '1rem',
        padding : '1rem',
        backgroundColor : 'var(--clr-primary-light)',
        textAlign : 'right',
        animation : 'slide-down 500ms ease-in-out both',
      }

    const userSettingStyle = {
        display : 'flex',
        justifyContent : 'flex-end',
        gap : '1rem',
        marginBlock : '0.3rem',
    }

    const gridBtnStyle = { borderColor : viewMethod === 'grid' ? 'var(--clr-primary-med)' : 'transparent', }
    const tableBtnStyle = { borderColor : viewMethod === 'table' ? 'var(--clr-primary-med)' : 'transparent', }
    const authorBtnStyle = { borderColor : sortMethod === 'author' ? 'var(--clr-primary-med)' : 'transparent', }
    const titleBtnStyle = { borderColor : sortMethod === 'title' ? 'var(--clr-primary-med)' : 'transparent', }
    const newToOldBtnStyle = { borderColor : sortMethod === 'newToOld' ? 'var(--clr-primary-med)' : 'transparent', }
    const oldToNewBtnStyle = { borderColor : sortMethod === 'oldToNew' ? 'var(--clr-primary-med)' : 'transparent', }
    const allBtnStyle = { borderColor : readFilter === 'all' ? 'var(--clr-primary-med)' : 'transparent', }
    const readBtnStyle = { borderColor : readFilter === 'read' ? 'var(--clr-primary-med)' : 'transparent', }
    const unReadBtnStyle = { borderColor : readFilter === 'unread' ? 'var(--clr-primary-med)' : 'transparent', }

    return(
        <section style={ style } className="user-settings container" >

            <button onClick={ () => setActiveMenuItem(false) }>
              <img src={ menuCloseIcon } alt="Close Menu" />
            </button>

            <div style={ userSettingStyle }>
                View As: 
                <button onClick={ () => setViewMethod('grid')} style={ gridBtnStyle } >
                    Grid
                </button>

                <button onClick={ () => setViewMethod('table')} style={ tableBtnStyle } >
                    Table
                </button>
            </div>

            <div style={ userSettingStyle }>
                Sort By:
                <button onClick={ () => setSortMethod('author')} style={ authorBtnStyle } >
                    Author
                </button>

                <button onClick={ () => setSortMethod('title')} style={ titleBtnStyle } >
                    Title
                </button>

                <button onClick={ () => setSortMethod('newToOld')} style={ newToOldBtnStyle } >
                    Newest to Oldest
                </button>

                <button onClick={ () => setSortMethod('oldToNew')} style={ oldToNewBtnStyle } >
                    Oldest to Newest
                </button>
            </div>

            <div style={ userSettingStyle }>
                Filter By:
                <button onClick={ () => setReadFilter('all') } style={ allBtnStyle } >
                    All
                </button>
                
                <button onClick={ () => setReadFilter('read') } style={ readBtnStyle } >
                    Read Books
                </button>

                <button onClick={ () => setReadFilter('unread') } style={ unReadBtnStyle } >
                    Unread Books
                </button>
            </div>

        </section>
    )
}