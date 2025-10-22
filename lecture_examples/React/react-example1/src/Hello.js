function Hello(props) {
    return (
        <div>
            <h1>{props.header}</h1>
            <p>{props.greeting}</p>
        </div>
    );
}

/*
function Hello({header, greeting}) {
    return (
        <div>
            <h1>{header}</h1>
            <p>{greeting}</p>
        </div>
    );
}
*/

export default Hello;