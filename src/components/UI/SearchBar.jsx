import React from "react";
import { Search } from "react-feather";
import { Input } from "reactstrap";
import "./search.css";

export default function SearchBar(props) {
  const {
    placeholder = "Search",
    filterText = "",
    onFilterTextChange = (f) => f,
    _ref = null,
  } = props;

  const handleFilterTextChange = (e) => {
    onFilterTextChange(e.target.value);
  };

  return (
    <div className="form-group has-search ">
      <span className="form-control-feedback">
        <Search />
      </span>
      <Input
        innerRef={_ref}
        className="form-control-alternative py-2 border-primary"
        name="filterText"
        value={filterText}
        onChange={handleFilterTextChange}
        type="text"
        placeholder={placeholder}
        style={{
          fontSize: "15px",
          borderWidth: "2px",
        }}
        {...props}
      />
    </div>
  );
}
