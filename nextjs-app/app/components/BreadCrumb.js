// app/components/navigation/Breadcrumb.jsx
import Link from "next/link";

export default function Breadcrumb({ items, className = "" }) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className={index > 0 ? "flex items-center" : "inline-flex items-center"}>
            {index > 0 && (
              <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            )}
            
            {item.current ? (
              <span className={`${index > 0 ? "ml-1 md:ml-2" : ""} font-sans text-sm font-medium text-primary-600`}>
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className={`${index > 0 ? "ml-1 md:ml-2" : ""} font-sans text-sm text-gray-500 hover:text-primary-600`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}