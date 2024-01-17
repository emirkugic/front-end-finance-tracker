import { Link } from "react-router-dom";

const NotFound = () => {
	const textStyle = { color: "black" };

	return (
		<div className="d-flex align-items-center justify-content-center vh-100">
			<div className="text-center">
				<h1 className="display-1 fw-bold" style={textStyle}>
					404
				</h1>
				<p className="fs-3" style={textStyle}>
					<span className="text-danger">Oops!</span> Page not found.
				</p>
				<p className="lead" style={textStyle}>
					The page you are looking for does not exist.
				</p>
				<Link to="/" className="btn btn-primary">
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
