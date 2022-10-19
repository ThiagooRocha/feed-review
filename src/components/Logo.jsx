import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        Feed<span>Review</span>
      </Link>
    </div>
  );
};
