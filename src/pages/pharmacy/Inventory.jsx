import React, { useCallback, useEffect, useState } from "react";
import {
  CustomButton,
  CustomTable,
  SearchBar,
  TextInput,
} from "../../components/UI";
import { Row, Col, NavItem, NavLink, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getDrugSearch,
  getPurchaseItem,
  getTotalDrug,
  updateStock,
} from "../../redux/action/pharmacy";
import { useSelector } from "react-redux";
import CustomCard from "../../components/UI/CustomCard";
import Loading from "../../components/UI/Loading";
import { formatNumber } from "../../components/UI/helpers";
import Scrollbar from "../../components/UI/Scrollbar";
import { GET_PURCHASE_ITEM } from "../../redux/action/actionType";
import _customNotification from "../../components/UI/_customNotification";
import CustomPagination from "../../components/UI/CustomPagination";
import { useToasts } from "react-toast-notifications";
import { Printer } from "react-feather";
import InventoryPDF from "./InventoryPDF";
import { useQuery } from "../../hooks";

function Inventory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const type = query.get("type");
  const [filterText, setFilterText] = useState("");
  const { purchaseItems } = useSelector((state) => state.pharmacy);
  const loading = useSelector((state) => state.pharmacy.loading);
  // const role = useSelector((state) => state.auth.user.role);

  const totalDrugs = useSelector((state) => state.pharmacy.totalDrugs);

  const { activeBusiness } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ from: 0, to: 100 });
  const { addToast } = useToasts();
  const [viewPDF, setViewPDF] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      if (viewPDF) {
        setViewPDF(false);
      }
      setForm((p) => ({ from: (page - 1) * 100, to: 100 }));
      setCurrentPage(page);
    },
    [viewPDF]
  );
  const onEnableChange = (ind) => {
    const arr = [];
    purchaseItems.forEach((state, index) => {
      if (index === ind) {
        arr.push({ ...state, enable: true });
      } else {
        arr.push({ ...state, enable: false });
      }
    });
    dispatch({ type: GET_PURCHASE_ITEM, payload: arr });
  };
  const onCancelChange = (ind) => {
    const arr = [];
    purchaseItems.forEach((state, index) => {
      if (index === ind) {
        arr.push({ ...state, enable: false });
      } else {
        arr.push(state);
      }
    });
    dispatch({ type: GET_PURCHASE_ITEM, payload: arr });
  };
  const _getPurchaseItem = useCallback(() => {
    dispatch(getPurchaseItem({ from: form.from, to: form.to }));
    dispatch(getTotalDrug());
  }, [dispatch, form.from, form.to]);

  useEffect(() => {
    if (filterText.length > 0) {
      dispatch(getDrugSearch(filterText, form.from, form.to));
      dispatch(getTotalDrug(filterText));
    } else if (filterText.length === 0) {
      _getPurchaseItem();
    }
  }, [
    _getPurchaseItem,
    dispatch,
    filterText,
    filterText.length,
    form.from,
    form.to,
  ]);
  const fields = [
    {
      title: "Action",
      custom: true,
      component: (item, index) => {
        if (item.enable) {
          return (
            <>
              <CustomButton
                size="sm"
                onClick={() => {
                  onCancelChange(index);
                }}
                className="m-1"
                color="danger"
              >
                Cancel
              </CustomButton>
              <CustomButton
                size="sm"
                onClick={() => {
                  updateStock(
                    item,
                    () => {
                      onCancelChange(index);
                    },
                    () => {
                      _customNotification(addToast, "Error Occured");
                    }
                  );
                }}
                outline
              >
                Update
              </CustomButton>
            </>
          );
        } else {
          return (
            <CustomButton
              size="sm"
              onClick={() => {
                onEnableChange(index);
              }}
            >
              Edit
            </CustomButton>
          );
        }
      },

      className: "text-center",
    },
    { title: "Drug Name", value: "drug_name" },
    {
      title: "Quantity",
      custom: true,
      component: (item) => formatNumber(item.balance),
      className: "text-center",
    },
    {
      title: "Price(₦)",
      custom: true,
      component: (item, index) => {
        if (item.enable) {
          return (
            <TextInput
              value={item.selling_price}
              className="text-end"
              name="selling_price"
              onChange={({ target: { name, value } }) => {
                const arr = [];
                purchaseItems.forEach((state, ind) => {
                  if (index === ind) {
                    arr.push({ ...state, [name]: value });
                  } else {
                    arr.push(state);
                  }
                });
                dispatch({ type: GET_PURCHASE_ITEM, payload: arr });
              }}
            />
          );
        } else {
          return formatNumber(item.selling_price);
        }
      },

      className: "text-end",
    },

    // {
    //   title: "Amount",
    //   custom: true,
    //   component: (item) =>
    //     parseInt(item.selling_price) * parseInt(item.balance),
    // },

    {
      title: "Expiry Date",
      custom: true,
      component: (item) =>
        item.expiry_date === "1111-11-11" ? "-" : item.expiry_date,
      className: "text-end",
    },
    {
      title: "Store",
      value: "store",
    },
    {
      title: "Action ",
      custom: true,
      component: (item) => (
        <CustomButton
          className="m-1"
          size="sm"
          onClick={() => {
            navigate(
              `/app/pharmacy/drug-purchase/drug-view?formulation=${item.formulation?.replace("+","%2B")}&generic_name=${item.generic_name?.replace("+","%2B")}&item_code=${item.item_code?.replace("+","%2B")}&type=${type}&store=${item.store?.replace("+","%2B")}&expiry_date=${item.expiry_date?.replace("+","%2B")}&drug_name=${item.drug_name?.replace("+","%2B")}`
            );
          }}
        >
          {/* {JSON.stringify(item)} */}
          View
        </CustomButton>
      ),
      className: "text-center",
    },
  ];
  return (
    <div>
      <Wrapper>
        <Row>
          <Col md={10}>
            <SearchBar
              filterText={filterText}
              onFilterTextChange={(v) => {
                setFilterText(v);
              }}
              placeholder="Search by Drug name, Generic name, Barcode or Expiry date"
            />
          </Col>
          <Col md={2}>
            <strong>Total:</strong> {formatNumber(totalDrugs)}
          </Col>
        </Row>
        {loading && <Loading size="sm" />}
        <Scrollbar height={"75vh"}>
          <Row>
            <Col>
              <CustomPagination
                totalRecords={totalDrugs}
                pageLimit={20}
                pageNeighbours={7}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
              />
            </Col>
            <Col md={2}>
              <CustomButton
                onClick={() => setViewPDF(!viewPDF)}
                color={viewPDF ? "danger" : "primary"}
                size={"sm"}
              >
                <Printer />
                {viewPDF ? "Close" : "Print"}
              </CustomButton>
            </Col>
          </Row>
          {viewPDF ? (
            <>
              <InventoryPDF
                list={purchaseItems}
                range={{ ...form, from: form.from + 1 }}
                title={"Inventory items"}
                total={totalDrugs}
                activeBusiness={activeBusiness}
              />
            </>
          ) : (
            <CustomTable height={"75vh"} fields={fields} data={purchaseItems} />
          )}
        </Scrollbar>
      </Wrapper>
    </div>
  );
}

export const Wrapper = (props) => {
  const query = useQuery();
  const type = query.get("type");
  const _tab = query.get("tab");
  const navigate = useNavigate();
  const tabs = [
    { name: "Drug shelve", route: "drug-purchase" },
    { name: "Drug Registration", route: "drug-registration" },
    { name: "Drug Purchase", route: "add-new-purchase" },
    { name: "Out of stock", route: "out-of-stock" },
    { name: "Expired drugs", route: "expired-drugs" },
    { name: "Reorder Level", route: "reorder-level" },
    { name: "Withdraw Purchase", route: "withdraw-purchase" },
  ];
  return (
    <CustomCard
      className="p-0 m-0"
      full_width
      header={
        <Nav tabs className="p-0 m-0 text-center">
          {tabs.map((tab) => (
            <NavItem className="p-0 m-0 mx-2">
              <NavLink
                className="btn btn-primary"
                // outline
                size="sm"
                style={{
                  borderBlockColor: tab.name === _tab ? "#0275d8" : "#EEE",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  navigate(
                    `/app/pharmacy/drug-purchase/${tab.route}?type=${type}&tab=${tab.name}`
                  )
                }
              >
                {tab.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      }
      style={{ height: "92vh" }}
    >
      {props.children}
    </CustomCard>
  );
};

export default Inventory;
