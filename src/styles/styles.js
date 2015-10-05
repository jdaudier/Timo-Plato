import { GRAY, LIGHTGRAY, PINK, DARKPINK, SILVER } from './colors';

var styles = {
    hidden: {
        display: 'none'
    },
    
    form: {
        width: '100%'
    },

    input: {
        border: '1px solid ' + LIGHTGRAY,
        borderRadius: '7px',
        color: PINK,
        fontSize: '18px',
        height: '40px',
        padding: '23px',
        textAlign: 'center',
        width: '100%'
    },

    ul: {
        color: GRAY,
        listStyleType: 'none',
        paddingLeft: '0'
    },

    li: {
        border: '2.318px dashed ' + PINK,
        borderRadius: '7px',
        padding: '20px',
        marginBottom: '14px',
        position: 'relative',
        paddingRight: '90px'
    },

    h1: {
        fontSize: '22px',
        marginBottom: '0',
        marginTop: '0',
        textTransform: 'uppercase'
    },

    projectNameInput: {
        border: '1px solid ' + LIGHTGRAY,
        borderRadius: '3px',
        color: GRAY,
        fontFamily: 'Roboto Condensed, sans-serif',
        fontSize: '22px',
        padding: '5px',
        textTransform: 'uppercase',
        width: '100%'
    },

    h2: {
	    fontFamily: 'digital, Roboto Condensed, sans-serif',
        fontSize: '55px',
	    marginBottom: '.25em',
	    marginTop: '.15em',
	    textShadow: '0 0 5px SILVER'
    },

    image: {
        position: 'absolute',
        right: '10px',
        top: '15px',
        width: '60px'
    },

    button: {
        background: PINK,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '20px',
        fontWeight: '700',
        marginRight: '14px',
        padding: '10px',
        width: '70px'
    },

    buttonHover: {
        background: DARKPINK,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '20px',
        fontWeight: '700',
        marginRight: '14px',
        padding: '10px',
        width: '70px'
    },

    buttonImage: {
        height: '25px',
        width: '25px'
    }
};

export { styles };