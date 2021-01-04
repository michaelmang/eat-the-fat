import { Link } from 'gatsby';
import React from 'react';

export default function Logo() {
  return (
    <Link to="/">
      <div className="cursive flex flex-col items-center bg-white p-4 px-6 justify-center text-5xl font-light">
        <img className="h-20 w-40 my-2" src="https://images.ctfassets.net/9hjducs3pll2/21Gg5ZTu4waptaCY6jEiMq/77ca24ccd531978bff341e30d0520775/eat-the-fat.png" />
        Eat The Fat
      </div>
    </Link>
  );
}