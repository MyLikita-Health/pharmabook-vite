/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";

import { Navigate, useRoutes } from "react-router-dom";
import AuthenticatedContainer from "./AuthenticatedContainer";
import { NoMatch } from "../../pages/misc/no-match";

import { Login } from "../../pages/pharmacy/Users/Login";
import PharmacyIndex, { MainWrapper } from "../../pages/pharmacy/PharmacyIndex";
import Inventory, { Wrapper } from "../../pages/pharmacy/Inventory";
import Sales from "../../pages/pharmacy/sales/Sales";
import Supplier from "../../pages/pharmacy/supplier/Supplier";
import Drug from "../../pages/pharmacy/drug/Drug";
import PharmacyDashboard from "../../pages/pharmacy/PharmacyDashboard";
import SupplierForm from "../../pages/pharmacy/supplier/SupplierForm";
import SupplierPayment from "../../pages/pharmacy/supplier/SupplierPayment";
import SupplierReport from "../../pages/pharmacy/supplier/SupplierReport";
import DrugRegistration from "../../pages/pharmacy/drug/DrugRegistration";
import AddNewDrug from "../../pages/pharmacy/drug/AddNewDrug";
import DrugView, { GeneralWrapper } from "../../pages/pharmacy/DrugView";
import ManageStore from "../../pages/pharmacy/ManageStore";
import CreateUser from "../../pages/pharmacy/Users/CreateUser";
import Users, { UserWrapper } from "../../pages/pharmacy/Users/Users";
import ReturnItem from "../../pages/pharmacy/return-drug/ReturnItem";
import DrugSale from "../../pages/pharmacy/drug/DrugSales";
// import DashboardView from "../../pages/pharmacy/DashbordView";
import Description from "../../pages/pharmacy/description/Description";
import EditDrugDescription from "../../pages/pharmacy/description/EditDrugDescription";
import Order from "../../pages/pharmacy/order/Order";
import OrderView from "../../pages/pharmacy/order/orderView";
// import StoreSetup from "../../pages/pharmacy/StoreSetup";
import ProductCategory from "../../pages/pharmacy/ProductCategory";
import DrugViews from "../../pages/pharmacy/description/DrugView";
import GenerateReciept from "../../pages/pharmacy/GenerateReciept";
import TransferForm from "../../pages/pharmacy/TransferForm";
import Reports from "../../pages/pharmacy/Reports";
import PostSalePage from "../../pages/pharmacy/drug/PostSalePage";
import RenderStocks from "../../pages/pharmacy/drug/RenderStocks";
import RenderOutOfStock from "../../pages/pharmacy/drug/RenderOutOfStock";
import ReOderLevel from "../../pages/pharmacy/drug/ReorderLevel";
import StoreSetup from "../../pages/pharmacy/StoreSetup";
import WithdrawPurchase from "../../pages/pharmacy/drug/WithdrawPurchase";
// import  StockBalance from "../../pages/pharmacy/StockBalance"


import AccountsIndex from "../../pages/accounts/AccountsIndex";
import DoctorsReportFees from "../../pages/accounts/doctorReport/DoctorsReportFees";
import PendingPaymentTable from "../../pages/accounts/pendingPayment/PendingPaymentTable";
import ReviewAccountReport from "../../pages/accounts/reviewAccount/ReviewAccountReport";
import Expenditure from "../../pages/accounts/Expenditure";
import OpenBalance from "../../pages/accounts/OpenBalance";
import PendingDiscount from "../../pages/accounts/PendingDiscount";
import PurchaseOrder from "../../pages/accounts/PurchaseOrder";
import AssRent from "../../pages/accounts/AssetRent/AssRent";
import ClientApp from "../../pages/accounts/AssetRent//Client/ClientApp";
import GenerateAccountReport from "../../pages/accounts/generateAccount/GenerateAccountReport";
// import DoctorsDetails from '../../pages/accounts/doctorReport/DoctorsDetails'
import ClientTable from "../../pages/accounts/AssetRent/Client/ClientTab";
import Deposit from "../../pages/accounts/Deposit/Deposit";
import ViewClient from "../../pages/accounts/AssetRent/Client/ClientAccountView";
import ClientReg from "../../pages/accounts/Deposit/ClientReg";



import AdminIndex from "../../pages/admin/AdminIndex";
import Register from "../../pages/auth.js/Register";

import Expenses from "../../pages/reports/Expenses";
import { ErrorBoundary } from "./ErrorBoundary";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SignUp = React.lazy(() => import("../../pages/pharmacy/Users/SignUp"));


function AppNavigation() {
  let element = useRoutes([
    { path: "/", element: <Navigate to="/app/login" /> },
    { path: "/app/login", element: <Login /> },
    {
      path: "/app/sign-up",
      element: (
        <ErrorBoundary>
          <Suspense fallback={<div>loading...</div>}>
            <SignUp />{" "}
            {/* <div className="bg-primary">
              <SkeletonTheme baseColor="" highlightColor="">
                <p>
                  <Skeleton count={3} />
                </p>
              </SkeletonTheme>
            </div> */}
          </Suspense>
        </ErrorBoundary>
      ),
    },
    {
      path: "app",
      element: <AuthenticatedContainer />,
      children: [
        {
          path: "pharmacy",
          element: <PharmacyIndex />,
          children: [
            {
              index: true,
              element: <Inventory />,
            },
            {
              path: "reports",
              element: (
                <GeneralWrapper>
                  <Reports />
                </GeneralWrapper>
              ),
            },
            {
              path: "drug-sales",
              element: (
                // <GeneralWrapper>
                <DrugSale />
                // </GeneralWrapper>
              ),
            },
            {
              path: "post-sale-page",
              element: (
                <GeneralWrapper>
                  <PostSalePage />
                </GeneralWrapper>
              ),
            },
            {
              path: "expenses",
              element: <Expenses />,
            },
            { path: "description", element: <Description /> },
            { path: "description/drug", element: <EditDrugDescription /> },
            { path: "description/drug/:id", element: <EditDrugDescription /> },
            { path: "description/view/:id", element: <DrugViews /> },
            { path: "order", element: <Order /> },
            // { path: 'stock', element: <StockBalance /> },
            {
              path: "generate-reciept",
              element: (
                <GeneralWrapper>
                  <GenerateReciept />
                </GeneralWrapper>
              ),
            },
            { path: "order/view/:order_id", element: <OrderView /> },
            {
              path: "store-setup",
              element: (
                <GeneralWrapper>
                  <Users />
                </GeneralWrapper>
              ),
            },
            {
              path: "create-agent",
              element: (
                <GeneralWrapper>
                  <UserWrapper>
                    <CreateUser />
                  </UserWrapper>
                </GeneralWrapper>
              ),
            },
            {
              path: "manage-store",
              element: (
                <GeneralWrapper>
                  <UserWrapper>
                    <ManageStore />
                  </UserWrapper>
                </GeneralWrapper>
              ),
            },
            {
              path: "settings",
              element: (
                <GeneralWrapper>
                  <UserWrapper>
                    <StoreSetup />
                  </UserWrapper>
                </GeneralWrapper>
              ),
            },
            { path: "product-category", element: <ProductCategory /> },
            { path: "transfer-form", element: <TransferForm /> },
            {
              path: "manage-user",
              children: [
                {
                  index: true,
                  element: <Users />,
                },
                {
                  path: "form",
                  element: <CreateUser />,
                },
                {
                  path: "form/:id",
                  element: <CreateUser />,
                },
              ],
            },
            {
              path: "drug-purchase",
              // element: ,
              children: [
                {
                  path: "drug-purchase",
                  index: true,
                  element: (
                    <MainWrapper>
                      <Inventory />
                    </MainWrapper>
                  ),
                },
                {
                  path: "drug-registration",
                  element: (
                    <MainWrapper>
                      <Wrapper>
                        <DrugRegistration />
                      </Wrapper>
                    </MainWrapper>
                  ),
                },
                {
                  path: "add-new-purchase",
                  element: (
                    <MainWrapper>
                      <Wrapper>
                        <AddNewDrug />
                      </Wrapper>
                    </MainWrapper>
                  ),
                },

                { path: "drug-view", element: <DrugView /> },
                {
                  path: "out-of-stock",
                  element: (
                    <MainWrapper>
                      <Wrapper>
                        <RenderOutOfStock />
                      </Wrapper>
                    </MainWrapper>
                  ),
                },
                {
                  path: "reorder-level",
                  element: (
                    <MainWrapper>
                      <Wrapper>
                        <ReOderLevel />
                      </Wrapper>
                    </MainWrapper>
                  ),
                },
                {
                  path: "expired-drugs",
                  element: (
                    <MainWrapper>
                      <Wrapper>
                        <RenderStocks />
                      </Wrapper>
                    </MainWrapper>
                  ),
                },
                {
                  path: "withdraw-purchase",
                  element: (
                    <MainWrapper>
                      <Wrapper>
                        <WithdrawPurchase />
                      </Wrapper>
                    </MainWrapper>
                  ),
                },
              ],
            },
            {
              path: "returned-drugs",
              element: <ReturnItem />,
            },
            {
              path: "manage-store",
              element: <ManageStore />,
            },
            {
              path: "manage-customer",
              children: [
                {
                  index: true,
                  element: (
                    <GeneralWrapper>
                      <ClientTable />
                    </GeneralWrapper>
                  ),
                },
                {
                  path: "client_reg_form",
                  element: (
                    <GeneralWrapper>
                      <ClientReg />
                    </GeneralWrapper>
                  ),
                },
                {
                  path: "client_deposit",
                  element: (
                    <GeneralWrapper>
                      <Deposit />
                    </GeneralWrapper>
                  ),
                },
                {
                  path: "client_account_view",
                  element: (
                    <GeneralWrapper>
                      <ViewClient />
                    </GeneralWrapper>
                  ),
                },
              ],
            },
            {
              path: "manage-suppliers",
              // element: <Supplier />,
              children: [
                {
                  // path:'/',
                  index: true,
                  element: (
                    <GeneralWrapper>
                      <Supplier />
                    </GeneralWrapper>
                  ),
                },
                {
                  path: "supplier_form",

                  element: (
                    <GeneralWrapper>
                      <SupplierForm />
                    </GeneralWrapper>
                  ),
                },
                {
                  path: "supplier_payment",
                  element: (
                    <GeneralWrapper>
                      <SupplierPayment />
                    </GeneralWrapper>
                  ),
                },
                {
                  path: "supplier-report",
                  element: (
                    <GeneralWrapper>
                      <SupplierReport />
                    </GeneralWrapper>
                  ),
                },
              ],
            },
            {
              path: "sales-report",
              element: <Sales />,
            },

            {
              path: "dashboard",
              element: (
                <GeneralWrapper>
                  <PharmacyDashboard />
                </GeneralWrapper>
              ),
            },
          ],
        },
        {
          path: "accounts",
          element: <AccountsIndex />,
          children: [
            { path: "other-incomes" },
            { path: "record-expenses", element: <Expenditure /> },
            { path: "client-account", element: <ClientApp /> },
            { path: "cash-movement" },
            { path: "opening-balance", element: <OpenBalance /> },
            { path: "account-report" },
            { path: "other-incomes" },
            { path: "record-expenses", element: <Expenditure /> },
            { path: "client-account" },
            { path: "cash-movement" },
            { path: "opening-balance", element: <OpenBalance /> },
            { path: "account-report", element: <GenerateAccountReport /> },
            { path: "client-statement" },
            { path: "services-setup" },
            { path: "account-chart-setup" },
            { path: "discount-setup" },
            { path: "asset-register", element: <AssRent /> },
            { path: "pending-discount-requests", element: <PendingDiscount /> },
            { path: "pending-payment", element: <PendingPaymentTable /> },
            { path: "account-review", element: <ReviewAccountReport /> },
            { path: "doctors-reporting-fees", element: <DoctorsReportFees /> },
            { path: "services-setup" },
            { path: "account-chart-setup" },
            { path: "discount-setup" },
            { path: "asset-register" },
            { path: "pending-discount-requests", element: <PendingDiscount /> },
            { path: "pending-payment", element: <PendingPaymentTable /> },
            { path: "account-review", element: <ReviewAccountReport /> },
            { path: "doctors-reporting-fees", element: <DoctorsReportFees /> },
            // { path: 'other-incomes', element: <OtherIncome /> },
            { path: "record-expenses", element: <Expenditure /> },
            { path: "client-account", element: <ClientApp /> },
            { path: "cash-movement" },
            { path: "opening-balance", element: <OpenBalance /> },
            // { path: 'account-report', element: <AccounReport /> },
            { path: "opening-balance", element: <OpenBalance /> },
            { path: "account-report", element: <GenerateAccountReport /> },
            // { path: 'client-statement', element: <AccountStatement /> },
            { path: "services-setup" },
            { path: "account-chart-setup" },
            // { path: 'discount-setup', element: <DiscountSetUp /> },
            { path: "asset-register", element: <AssRent /> },
            { path: "pending-discount-requests", element: <PendingDiscount /> },
            { path: "pending-payment", element: <PendingPaymentTable /> },
            // { path: 'move- ', element: <MoveMoney /> },
            { path: "account-review", element: <ReviewAccountReport /> },
            { path: "doctors-reporting-fees", element: <DoctorsReportFees /> },

            { path: "opening-balance", element: <OpenBalance /> },
            { path: "account-report" },
            {
              path: "account-chart-setup",
              children: [
                // { index: true, element: <AccountChartTable /> },
                // { path: "tree", element: <AccountChart /> },
              ],
            },
            { path: "discount-setup" },
            { path: "asset-register", element: <AssRent /> },
            { path: "pending-discount-requests", element: <PendingDiscount /> },
            { path: "pending-payment", element: <PendingPaymentTable /> },
            { path: "account-review", element: <ReviewAccountReport /> },
            { path: "doctors-reporting-fees", element: <DoctorsReportFees /> },
            { path: "account-chart-setup" },
            { path: "discount-setup" },
            { path: "asset-register" },
            { path: "pending-discount-requests", element: <PendingDiscount /> },
            { path: "pending-payment", element: <PendingPaymentTable /> },
            { path: "account-review", element: <ReviewAccountReport /> },
            { path: "doctors-reporting-fees", element: <DoctorsReportFees /> },
            {
              // path: "doctors-reporting-fees-details",
              // element: <DoctorsReportFees />,
              // path: 'doctors-reporting-fees-details',
              // element: <DoctorsDetails />,
            },
            {
              path: "purchase-order",
              element: <PurchaseOrder />,
            },
          ],
        },
        {
          path: "admin",
          element: <AdminIndex />,
        },
      ],
    },
    {
      path: "auth",
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "sign-up", element: <Register /> },
      ],
    },
    { path: "*", element: <NoMatch /> },
  ]);
  return element;
}

export default AppNavigation;
