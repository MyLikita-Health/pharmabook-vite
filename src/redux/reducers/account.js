import {
  GETTING_SUMMARY_REPORT,
  GET_SUMMARY_REPORT,
  GET_ALL_PENDING_REQ,
  GET_BRANCH_REQ,
  GET_REQUISITION_LIST,
  GETTING_ACC_CHART,
  GET_ACC_CHART_TREE,
  GET_ITEM_CHART_TREE,
  GET_ACC_CHART,
  GET_OTHER_EXPENSES,
  GET_SALES,
  GET_SALES2,
} from "../action/actionType";

const initialState = {
  accountChart: [],
  accountChartLoading: true,
  accChartTree: [],
  reports: {
    generalAccountReport: [],
    summary: {
      income: [],
      expenses: [],
      loading: false,
    },
  },
  allBranchReq: [],

  otherExpenses: [],
  branchItem: [],
  requisitionList: [],
  branchRegItem: [],
  branchRegItem2: [],
  itemChartTree: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_ACC_CHART:
      return {
        ...state,
        accountChartLoading: !state.accountChartLoading,
      };

    case GET_ACC_CHART:
      return {
        ...state,
        accountChart: action.payload,
      };

    case GET_ACC_CHART_TREE:
      return {
        ...state,
        accChartTree: action.payload,
      };
    case GETTING_SUMMARY_REPORT:
      return {
        ...state,
        reports: {
          ...state.reports,
          summary: {
            ...state.reports.summary,
            loading: !state.reports.summary.loading,
          },
        },
      };
    case GET_SUMMARY_REPORT:
      return {
        ...state,
        reports: {
          ...state.reports,
          summary: {
            ...state.reports.summary,
            ...action.payload,
          },
        },
      };
    case GET_ALL_PENDING_REQ:
      return {
        ...state,
        allBranchReq: action.payload,
      };
    case GET_BRANCH_REQ:
      return {
        ...state,
        branchRegItem: action.payload,
      };

    case GET_OTHER_EXPENSES:
      return {
        ...state,
        otherExpenses: action.payload,
      };
    case GET_SALES:
      return {
        ...state,
        branchItem: action.payload,
      };
    case GET_SALES2:
      return {
        ...state,
        branchItem2: action.payload,
      };
    case GET_REQUISITION_LIST:
      return {
        ...state,
        requisitionList: action.payload,
      };
    case GET_ITEM_CHART_TREE:
      return {
        ...state,
        itemChartTree: action.payload,
      };

    default:
      return state;
  }
};

export default accountReducer;
