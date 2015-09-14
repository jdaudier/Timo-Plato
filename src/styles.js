import { PINK, LIGHTGRAY, GRAY } from './colors';

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
        marginBottom: '15px',
        marginTop: '0',
        textTransform: 'uppercase'
    },

    h2: {
        fontSize: '22px'
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