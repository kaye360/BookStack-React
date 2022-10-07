

import * as IMG from '../img'

export default function Logo(props) {

    const {title} = props

    const style = {
        display : 'flex',
        alignItems : 'center',
        gap : '1rem',
    }


    return(
        <div style={ style }>
            <img src={IMG.logo} alt="Logo" /> 
            <h1>{ title || 'BookStack' }</h1>
        </div>
    )
}