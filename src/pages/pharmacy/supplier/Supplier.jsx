import React, { useCallback, useState } from "react";
import CustomButton from "../../../components/UI/CustomButton";
import CustomCard from "../../../components/UI/CustomCard";
import { CustomTable, SearchBar } from "../../../components/UI";
import { useSelector } from "react-redux";
import {
  getSupplierCount,
  getSupplierInfo,
} from "../../../redux/action/pharmacy";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import { formatNumber } from "../../../components/UI/helpers";
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Scrollbar from "../../../components/UI/Scrollbar";
import { useQuery } from "../../../hooks";

export default function Supplier() {
  const supplierInfo = useSelector((state) => state.pharmacy.supplierInfo);
  const supplierCount = useSelector((state) => state.pharmacy.supplierCount);
  const query = useQuery();
  const type = query.get("type");
  const loading = useSelector((state) => state.pharmacy.loading);
  const navigate = useNavigate();
  const fields = [
    {
      title: "S/N",
      custom: true,
      component: (item, idx) => idx + 1,
      className: "text-center",
    },
    {
      title: "Supplier Name",
      value: "supplier_name",
    },
    {
      title: "Phone",
      value: "phone",
    },
    // {
    //   title: "Email",
    //   value: "email",
    // },
    {
      title: "Address",
      value: "address",
    },
    {
      title: "Current Balance (₦)",
      custom: true,
      component: (item) => formatNumber(item.balance),
      className: "text-end",
    },
    {
      title: "Action",
      custom: true,
      component: (item) => (
        <CustomButton
          size="sm"
          onClick={() =>
            navigate(
              `/app/pharmacy/manage-suppliers/supplier-report?phone=${item.phone}&balance=${item.balance}&supplier_code=${item.supplier_code}&supplier_name=${item.supplier_name}&type=${type}`
            )
          }
        >
          {" "}
          View
        </CustomButton>
      ),
      className: "text-center",
    },
  ];
  const dispatch = useDispatch();
  const _getSupplierInfo = useCallback(() => {
    dispatch(getSupplierInfo());
    dispatch(getSupplierCount());
  }, [dispatch]);
  useEffect(() => {
    _getSupplierInfo();
  }, [_getSupplierInfo]);
  return (
    <div>
      <CustomCard
        back
        header="Suppliers"
        style={{ height: "90vh" }}
        headerRight={
          <Row>
            <Col col={5}>
              <CustomButton
                size="sm"
                outline
                onClick={() =>
                  navigate(
                    `/app/pharmacy/manage-suppliers/supplier_payment?type=${type}`
                  )
                }
              >
                Supplier Payment
              </CustomButton>
              <CustomButton
                size="sm"
                className="m-1"
                onClick={() =>
                  navigate(
                    `/app/pharmacy/manage-suppliers/supplier_form?type=${type}`
                  )
                }
              >
                Add New Supplier
              </CustomButton>
            </Col>
          </Row>
        }
      >
        {/* {JSON.stringify(supplierCount)} */}

        <Row className="mt-2 mb-2">
          <Col md={9}>
            <SearchBar placeholder="Search by drug name or expiry date" />
          </Col>
          <Col>Total: {supplierInfo.length}</Col>
        </Row>
        <div>
          {loading && <Loading size="sm" />}
          <Scrollbar>
            <CustomTable height={"90vh"} fields={fields} data={supplierInfo} />
          </Scrollbar>
        </div>
      </CustomCard>
    </div>
  );
}

const Pages = ({ supplierCount }) => {
  const [count, setCount] = useState(0);
  const arr = [];
  // while (count < parseInt(supplierCount)) {
  //   arr.push(
  //     <PaginationItem>
  //       <PaginationLink href="#">{count + 1}</PaginationLink>
  //     </PaginationItem>
  //   );
  //   setCount(count + +1);
  // }
  // useEffect(() => {}, [arr, supplierCount]);
  // for (let i = 0; i < parseInt(supplierCount); i++) {
  //   arr.push(
  //     <PaginationItem>
  //       <PaginationLink href="#">{i+1}</PaginationLink>
  //     </PaginationItem>
  //   );
  // }
  return (
    <>
      {/* {JSON.stringify(arr)} */}
      <Pagination
        aria-label="Page navigation example"
        className="m-0 p-0"
        size="sm"
      >
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {arr}
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </>
  );
};
