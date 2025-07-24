import { Outlet } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import AccountMenu from './AccountMenu'

export default function AccountsIndex() {
  return (
    <div>
      <Row className="m-0 p-0">
        <Col md={3} className='px-1'>
          <AccountMenu />
        </Col>
        <Col md={9} className='px-1'>
          <Outlet />
        </Col>
      </Row>
    </div>
  )
}
