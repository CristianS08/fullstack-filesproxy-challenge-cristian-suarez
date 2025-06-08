import { Container } from "react-bootstrap"
import Header from "./components/common/Header"
import DataTable from "./components/data/DataTable"

const App = () => {
  return (
    <div>
      <Header />
      <Container fluid className="mt-3">
        <DataTable />
      </Container>
    </div>
  )
}

export default App
