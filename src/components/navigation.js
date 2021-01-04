import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default ({ className = "" }) => (
  <nav className={className} role="navigation">
    <ul className={`${styles.navigation} py-2`}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Blog</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/about/">About</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/contact/">Contact</Link>
      </li>
    </ul>
  </nav>
)
