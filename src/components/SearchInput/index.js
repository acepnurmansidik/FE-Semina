import React from "react";
import { Form } from "react-bootstrap";

const SearchInput = ({ handleChange, query, disable, className }) => {
  return (
    <Form.Group>
      <Form.Control
        disabled={disable}
        type="text"
        placeholder="Set keyword here..."
        value={query}
        name="query"
        onChange={handleChange}
        className={className}
      />
    </Form.Group>
  );
};

export default SearchInput;
