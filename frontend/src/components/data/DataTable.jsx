"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Spinner, Alert, Form, InputGroup, Button, Row, Col } from "react-bootstrap"
import { fetchData } from "../../features/files/filesSlice"

const DataTable = () => {
  // Redux hooks: dispatch actions and access state
  const dispatch = useDispatch()
  const { data, loading, error, isFiltered } = useSelector((state) => state.data)

  // Local state to manage the search input
  const [searchTerm, setSearchTerm] = useState("")

  // On initial render, fetch all data
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  // Handle form submission: dispatch fetchData with search term as fileName
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      dispatch(fetchData(searchTerm.trim()))
    }
  }

  // Clear filter and reload all data
  const handleClearFilter = () => {
    setSearchTerm("")
    dispatch(fetchData())
  }

  // Update search term as user types
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Generate table rows dynamically based on the response structure
  const renderTableRows = () => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center text-muted">
            No data available
          </td>
        </tr>
      )
    }

    // Flatten the list of files and their lines to render all rows
    return data.flatMap((fileData) =>
      fileData.lines.map((line, lineIndex) => (
        <tr key={`${fileData.file}-${lineIndex}`}>
          <td>{fileData.file}</td>
          <td>{line.text || "N/A"}</td>
          <td>{line.number || "N/A"}</td>
          <td>{line.hex || "N/A"}</td>
        </tr>
      ))
    )
  }

  // Show spinner while loading
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  // Show error alert if request fails
  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        Error loading data: {error}
      </Alert>
    )
  }

  return (
    <div>
      {/* Search form with input and buttons */}
      <Row className="mb-3">
        <Col md={8}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Filter by file name (e.g., test2.csv)"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="danger" type="submit" disabled={loading}>
                Search
              </Button>
              {/* Show clear button only if filtering */}
              {isFiltered && (
                <Button variant="outline-secondary" onClick={handleClearFilter}>
                  Clear Filter
                </Button>
              )}
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Display alert with current search term if filtering */}
      {isFiltered && (
        <Alert variant="info" className="mb-3">
          Showing filtered results for: <strong>{searchTerm}</strong>
        </Alert>
      )}

      {/* Render the main table */}
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
    </div>
  )
}

export default DataTable
