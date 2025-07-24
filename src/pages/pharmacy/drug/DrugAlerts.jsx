import { useEffect, useState } from "react";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, List } from "reactstrap";
import {
  getExpiryAlert,
  getPurchaseItem,
} from "../../../redux/action/pharmacy";
import Scrollbar from "../../../components/UI/Scrollbar";
import { SearchBar } from "../../../components/UI";
import { Search } from "react-feather";
import store from "../../../redux/store";
import { _fetchApi } from "../../../redux/action/api";
import { NA_STOCKS } from "../../../redux/action/actionType";

function DrugAlerts() {
  const today = moment().format("YYYY-MM-DD");
  const { expiryAlert } = useSelector((state) => state.pharmacy);
  const [show_search, setShowSh] = useState(false)
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const info = useCallback(() => {
    dispatch(getExpiryAlert());
  }, [dispatch]);
  useEffect(() => {
    info();
  }, [info]);
  const data = filterText.length > 0 ? expiryAlert.filter((item) =>
  (item.drug_name.toLowerCase().includes(filterText.toLowerCase())
    || item.generic_name.toLowerCase().includes(filterText.toLowerCase())
  )) : expiryAlert
  return (
    <Card className="border-danger" style={{ fontSize: '12px' }
    }>
      <CardBody className="m-0 p-0 ">
        <h5 className="text-center text-danger">Expiry Alert <Search onClick={() => { setFilterText(''); setShowSh(!show_search) }} /> </h5>
        {show_search && <SearchBar
          filterText={filterText}
          onFilterTextChange={(v) => {
            setFilterText(v);
          }}
        />}
        <Scrollbar height='88vh' autoHide>
          {data.map((state) => (
            <>
              {state.expiry_date === "1111-11-11" ? (
                ""
              ) : (
                <List className="m-0 " style={{ padding: '10px' }}>
                  <li>{state.drug_name}
                    (Expires in {moment(state.expiry_date).diff(
                      today,
                      "days"
                    )}{" "}
                    days)
                  </li>
                </List>
              )}
            </>
          ))}

        </Scrollbar>
      </CardBody>
    </Card>
  );
}




export function OutOfStock() {
  // const { reorderLevel } = useSelector((state) => state.pharmacy);
  const [show_search, setShowSh] = useState(false);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");

  const info = useCallback(() => {
    dispatch(getPurchaseItem({ from: 0, to: 100, query_type: "na_stocks" }));
  }, [dispatch]);
  useEffect(() => {
    if (filterText.length > 0) {
      dispatch(searchOutOfStock({ filterText }));
    } else {
      info();
    }
  }, [dispatch, filterText, info]);
  function searchOutOfStock({ filterText = "" }) {
    const facilityId = store.getState().auth.user.facilityId;
    return (dispatch) => {
      let url = `/pharmacy/v1/get-search-out-of-stock?facilityId=${facilityId}&filterText=${filterText}`;
      _fetchApi(
        url,
        (res) => {
          if (res.success) {
            console.log(res);
            dispatch({
              type: NA_STOCKS,
              payload: res.results,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };
  }
  const { na_stocks } = useSelector((state) => state.pharmacy);

  return (
    <Card className="border-info" style={{ fontSize: "12px" }}>
      <CardBody className="m-0 p-0 ">
        <h5 className="text-center text-info">
          Out of stock{" "}
          <Search
            onClick={() => {
              setFilterText("");
              setShowSh(!show_search);
            }}
          />{" "}
        </h5>
        {show_search && (
          <SearchBar
            filterText={filterText}
            onFilterTextChange={(v) => {
              setFilterText(v);
            }}
          />
        )}
        <Scrollbar height="88vh" autoHide>
          {na_stocks.map((state) => (
            <List className="m-0 " style={{ padding: "10px" }}>
              <li>
                {state.drug_name}({state.generic_name})
              </li>
            </List>
          ))}
        </Scrollbar>
      </CardBody>
    </Card>
  );
}

export default DrugAlerts;
