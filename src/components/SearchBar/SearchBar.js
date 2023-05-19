import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSearch} className={styles.searchForm}>
      <FormControl
        type="text"
        placeholder="Search properties"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <Button type="submit" className={styles.searchButton}>
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
