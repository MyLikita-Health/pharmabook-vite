import ListMenuItem from "../../components/UI/vertical-menu copy/ListMenuItem";
import VerticalMenu from "../../components/UI/vertical-menu copy/VerticalMenu";
import './side-bar.css'

const menuItems = [
  { label: 'Billing', path: 'billing' },
  { label: 'Record Expenses', path: 'record-expenses' },
  { label: 'Create Client Account', path: 'client-account' },
  { label: 'Client Account Statement', path: 'client-statement' },
  { label: 'Cash Movement', path: 'cash-movement' },
  { label: 'Generate Account Report', path: 'generate-account-rpt' },
  { label: 'Opening Balance', path: 'opening-balance' },
  { label: 'Account Report', path: 'account-report' },
  { label: 'Services Setup', path: 'services-setup' },
  { label: 'Setup Account Chart', path: 'account-chart-setup' },
  { label: 'Account Review', path: 'account-review' },
  { label: 'Asset Register', path: 'asset-register' },
  { label: 'Doctor Reporting Fees', path: 'doctors-reporting-fees' },
  { label: 'Discount Setup', path: 'discount-setup' },
  { label: 'Part Payment Transactions', path: 'pending-payment' },
  { label: 'Purchase Order', path: 'purchase-order' },
  { label: 'Pending Discount Requests', path: 'pending-discount-requests' },
  { label: 'Pending Payment', path: 'pending-something' },
]

function AccountMenu() {
  return (
    <div>
      <VerticalMenu title="What will like to do?">
        <div className='side-bar'>
        {menuItems.map((i) => (
          <ListMenuItem route={i.path}>{i.label}</ListMenuItem>
        ))}</div>
      </VerticalMenu>
    </div>
  );
}

export default AccountMenu; 
