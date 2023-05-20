import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';

const CreateListing = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const listing = {
      title,
      description,
      price: Number(price),
      userId: user.uid, // assuming user object contains uid
    };

    console.log(listing);

    // reset form fields
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Listing</h2>

      <TextField
        required
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        required
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        required
        label="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        type="number"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

CreateListing.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CreateListing;
