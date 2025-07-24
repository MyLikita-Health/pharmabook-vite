import {
  GETTING_SUMMARY_REPORT,
  GET_SUMMARY_REPORT,
  GET_ALL_PENDING_REQ,
  GET_BRANCH_REQ,
  GET_REQUISITION_LIST,
  GETTING_ACC_CHART,
  GET_ACC_CHART_TREE,
} from "./actionType";
import moment from "moment";
import { apiURL, _fetchApi } from "./api";
import store from "../store";

const endpoint = "account";

export function getTxnSummaryReport(fromDate, toDate) {
  return (dispatch) => {
    let from =
      fromDate === ""
        ? moment().format("YYYY-MM-DD")
        : moment(fromDate).format("YYYY-MM-DD");
    let to =
      toDate === ""
        ? moment().format("YYYY-MM-DD")
        : moment(toDate).format("YYYY-MM-DD");
    dispatch({ type: GETTING_SUMMARY_REPORT });
    _fetchApi(
      `${apiURL}/transactions/reports/summary/${from}/${to}`,
      ({ results }) => {
        dispatch({ type: GET_SUMMARY_REPORT, payload: results });
        dispatch({ type: GETTING_SUMMARY_REPORT });
      },
      (err) => {
        console.log(err);
        dispatch({ type: GETTING_SUMMARY_REPORT });
      }
    );
  };
}

export function getAccChart() {
  const facilityId = store.getState().auth.user.facilityId;
  return (dispatch) => {
    dispatch({ type: GETTING_ACC_CHART });
    console.log(apiURL);
    _fetchApi(
      `/${endpoint}/v1/get-acc-chart?facilityId=${facilityId}`,
      ({ results }) => {
        // dispatch({ type: GET_ACC_CHART, payload: results });
        dispatch({ type: GETTING_ACC_CHART });
        let arrInTree = unflatten(results);
        // console.log(arrInTree)
        dispatch({ type: GET_ACC_CHART_TREE, payload: arrInTree });
      },
      (err) => {
        dispatch({ type: GETTING_ACC_CHART });
        console.log(err);
      }
    );
  };
}

export function unflatten(arr) {
  var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.title] = arrElem;
    mappedArr[arrElem.title]["children"] = [];
  }

  for (var title in mappedArr) {
    // console.log(title, mappedArr)
    if (mappedArr.hasOwnProperty(title)) {
      mappedElem = mappedArr[title];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.subhead) {
        mappedArr[mappedElem["subhead"]]["children"].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

export function getAllBranchRequest() {
  return (dispatch) => {
    _fetchApi(
      `/account/get_all/branch_req`,
      ({ results }) => {
        dispatch({ type: GET_ALL_PENDING_REQ, payload: results });
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function getReqBranches(requisition_no) {
  return (dispatch) => {
    _fetchApi(
      `/account/branch_req_item/${requisition_no}`,
      (data) => {
        if (data.success) {
          dispatch({ type: GET_BRANCH_REQ, payload: data.results });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
export function getRequisitionList() {
  return (dispatch) => {
    _fetchApi(
      `/account/branch_req_requisition/requisition_no`,
      (data) => {
        if (data.success) {
          dispatch({ type: GET_REQUISITION_LIST, payload: data.results });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
