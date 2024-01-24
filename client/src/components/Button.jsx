import { Link } from "react-router-dom";
import clsx from "clsx";

export function Button({ href, className, ...props }) {
  className = clsx(
    "inline-flex justify-center rounded-2xl bg-blue-600 px-4 py-3 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70",
    className
  );

  return href ? (
    <Link to={href} className={className} {...props}></Link>
  ) : (
    <button className={className} {...props} />
  );
}
