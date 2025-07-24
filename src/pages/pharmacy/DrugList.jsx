import React, { useCallback, useEffect, useState } from "react";
import {
  CustomButton,
  CustomTable,
  SearchBar,
  TextInput,
} from "../../components/UI";
import { Row, Col, Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";
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
import { useToasts } from "react-toast-notifications";
import { Book, FilePlus } from "react-feather";

function Inventory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const purchaseItems = useSelector((state) => state.pharmacy.purchaseItems);
  const loading = useSelector((state) => state.pharmacy.loading);
  const role = useSelector((state) => state.auth.user.role);
  const totalDrugs = useSelector((state) => state.pharmacy.totalDrugs);
  const [form, setForm] = useState({ from: 0, to: 100 });
  const { addToast } = useToasts();
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = useCallback((event, page) => {
    event.preventDefault();
    setForm((p) => ({ from: (page - 1) * 100, to: page * 100 }));
    setCurrentPage(page);
  }, []);
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
    dispatch(getPurchaseItem(form.from, form.to));
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
      title: "Selling Price(₦)",
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
              `/app/pharmacy/drug-purchase/drug-view?item_code=${item.item_code}&store=${item.store}`
            );
          }}
        >
          View
        </CustomButton>
      ),
      className: "text-center",
    },
  ];
  return (
    <div>
      <CustomCard className='p-0 m-0' style={{ height: "92vh" }} header={
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
            <strong>Total:</strong> {purchaseItems.length}
          </Col>
        </Row>
        <div>
          {loading && <Loading size="sm" />}
          <Scrollbar height={'70vh'}>
            <CustomTable fields={fields} data={purchaseItems} />
          </Scrollbar>
        </div>
      </CustomCard>
    </div >
  );
}

export default Inventory;
