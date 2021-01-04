import { Link } from "gatsby"
import React from "react"

export default function Categories({ className, data: categories = [] }) {
  return (
    <div className={`flex flex-row w-full px-8 py-2 sm:flex-col sm:w-1/12 sm:mr-8 ${className}`}>
      <div className="hidden text-sm font-bold uppercase sm:flex sm:mb-4">
        categories
      </div>
      <div className="flex flex-row w-full justify-between sm:flex-col">
        {categories.map(category => (
          <Link to={`/blog/categories/${category.toLowerCase()}/`}>
            <div key={category} className="cursor-pointer mb-2 mr-2 text-sm hover:underline">{category}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}