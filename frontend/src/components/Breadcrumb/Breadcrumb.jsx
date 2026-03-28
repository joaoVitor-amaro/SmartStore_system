import { Link } from "react-router-dom";
import "./Breadcrumb.css";

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => {
        const ultimo = index === items.length - 1;

        return (
          <span key={index}>
            {ultimo ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : (
              <Link to={item.path} className="breadcrumb-link">
                {item.label}
              </Link>
            )}

            {!ultimo && <span className="breadcrumb-separator"> &gt; </span>}
          </span>
        );
      })}
    </nav>
  );
}