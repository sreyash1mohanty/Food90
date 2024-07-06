import { useRouteError } from "react-router-dom";
const Error = () => {
    const error=useRouteError();
    return (
        <div className="error-container">
            <h1>Oops!</h1>
            <p>We can't seem to find the page you're looking for.</p>
            <p>Error code: {error.status}</p>

        </div>
    );
}
export default Error;
