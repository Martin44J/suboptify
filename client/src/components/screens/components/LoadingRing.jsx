import "./LoadingRing.css";

const LoadingRing = (props) => {
    if (props.size === "big") {
        return (<div className="lds-ring big"><div></div><div></div><div></div><div></div></div>);
    } else if (props.size === "little") {
        return (<div className="lds-ring little"><div></div><div></div><div></div><div></div></div>);
    }
}

export default LoadingRing;