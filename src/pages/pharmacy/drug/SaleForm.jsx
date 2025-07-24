import React from "react";
import { Col, Label, Row } from "reactstrap";
import { SearchBar, SelectInput, TextInput } from "../../../components/UI";

function SalesForm({
  disabled,
  form,
  handleChange,
  qttyRef,
  itemNameRef,
  setFilterText = (f) => f,
  options,
  user_id,
  filterText,
}) {
  return (
    <Row className="m-0 p-0">
      <Col md={6}>
        <Label>Search Items</Label>
        <SearchBar
          _ref={itemNameRef}
          placeholder="Search for items by code or name"
          clearButton
          filterText={filterText}
          onFilterTextChange={(v) => {
            setFilterText(v);
          }}
        />
      </Col>
      <Col md={3}>
        <TextInput
          placeholder="Enter Quantity"
          type="number"
          label="Enter Quantity"
          value={form.quantity_sold}
          _ref={qttyRef}
          name="quantity_sold"
          onChange={handleChange}
        />
      </Col>
      <Col md={3}>
        <SelectInput
          label="Select Store"
          _default="Select Store"
          type="select"
          value={form.store_name}
          name="store_name"
          options={options}
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
}

export default SalesForm;
