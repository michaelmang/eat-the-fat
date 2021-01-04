import { Link } from "gatsby"
import React from "react"

export default function Categories({ className, data: categories = [] }) {
  return (
    <div className={`flex flex-col w-full items-evenly mt-2 my-4 sm:my-2 sm:justify-start sm:flex-col sm:w-2/12 ${className}`}>
      <div className="text-sm font-bold uppercase sm:mb-4">
        categories
      </div>
      <div className="flex flex-row w-full justify-between sm:flex-col sm:justify-start">
        {categories.map(category => (
          <Link to={`/blog/categories/${category.toLowerCase()}/`}>
            <div key={category} className="cursor-pointer pb-1 mt-2 w-max mr-2 text-sm transition-all delay-75 border-b-2 border-solid border-transparent hover:border-cta">{category}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}