import { GRAY, LIGHTGRAY, PINK, DARKPINK, SILVER } from './colors';

var styles = {
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
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '24px',
        fontWeight: '700',
        marginRight: '14px',
        padding: '10px',
        textTransform: 'uppercase',
        width: '70px'
    },

    buttonHover: {
        background: DARKPINK,
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '24px',
        fontWeight: '700',
        marginRight: '14px',
        padding: '10px',
        textTransform: 'uppercase',
        width: '70px'
    }
};

export { styles };