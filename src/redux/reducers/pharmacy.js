import {
  GET_CLIENT_INFO,
  GET_CLIENT_STATEMENT,
  GET_DRUG_LIST,
  GET_PHARM_STORE,
  GET_PURCHASE_ITEM,
  GET_STOCK_INFO,
  GET_STOCK_INFO_STORE,
  GET_STOCK_INFO_STORE_SHELF,
  GET_SUPPLIER_INFO,
  GET_SUPPLIER_STATEMENT,
  GET_TOP_SALES,
  PHARM_LOADING,
  PHARM_USER,
  RECEIPT_DATA,
  SALES,
  SUPPLIER_COUNT,
  GET_EXPIRY_ALERT,
  GET_REORDER_LEVEL,
  GET_TOTAL_DRUG,
  DISPATCH_DISCOUNT,
  DISPATCH_AMOUNT_PAID,
  EXPIRED_STOCKS,
  NA_STOCKS,
  GET_DRUG_LIST_COUNT,
  NUMBER_OF_OUT_OF_STOCK,
  TOTAL_EXPIRED_DRUGS,
  SELECTED_USER,
  GET_PURCHASE,
  VIEW_PURCHASE,
  GET_TRANSACTIONS,
  GET_DISCOUNT,
  GET_EXPIRY_ALERT_TOP_FIVE,
} from "../action/actionType";

const initialState = {
  bankList: [
    "Access Bank",
    "Citi Bank",
    "EcoBank PLC",
    "First Bank PLC",
    "First City Monument Bank",
    "Fidelity Bank",
    "Guaranty Trust Bank",
    "Polaris bank",
    "Stanbic IBTC Bank",
    "Standard Chaterted bank PLC",
    "Sterling Bank PLC",
    "United Bank for Africa",
    "Union Bank PLC",
    "Wema Bank PLC",
    "Zenith bank PLC",
    "Unity Bank PLC",
    "ProvidusBank PLC",
    "Keystone Bank",
    "Jaiz Bank",
    "Heritage Bank",
    "Suntrust Bank",
    "FINATRUST MICROFINANCE BANK",
    "Rubies Microfinance Bank",
    "Kuda",
    "TCF MFB",
    "FSDH Merchant Bank",
    "Rand merchant Bank",
    "Globus Bank",
    "Paga",
    "Taj Bank Limited",
    "GoMoney",
    "AMJU Unique Microfinance Bank",
    "BRIDGEWAY MICROFINANCE BANK",
    "Eyowo MFB",
    "Mint-Finex MICROFINANCE BANK",
    "Covenant Microfinance Bank",
    "VFD Micro Finance Bank",
    "PatrickGold Microfinance Bank",
  ],
  supplierInfo: [],
  supplierStatement: [],
  drugList: [],
  purchaseItems: [],
  pharmStore: [],
  loading: false,
  clientInfo: [],
  clientStatement: [],
  saleItems: [],
  pharmUsers: [],
  receiptData: [],
  supplierCount: 0,
  stockInfo: {},
  stockInfoStore: {},
  stockInfoShelf: {},
  topSales: [],
  expiryAlert: [],
  reorderLevel: [],
  totalDrugs: 0,
  amountPaid: 0,
  discount: 0,
  expired_stocks: [],
  na_stocks: [],
  drugListCount: 0,
  numberOfOutOfStock: 0,
  totalExpiredDrugs: 0,
  selectedUser: {},
  purchase_order:[],
  view_purchase:[],
  get_transactions:[],
  _discount:0,
  topFive:[]
};

export default function pharmacyReducers(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIER_INFO:
      return {
        ...state,
        supplierInfo: action.payload,
      };
      case GET_EXPIRY_ALERT_TOP_FIVE:
      return {
        ...state,
        topFive: action.payload,
      };

      case GET_DISCOUNT:
      return {
        ...state,
        _discount: action.payload,
      };
      case GET_PURCHASE:
        return {
          ...state,
          purchase_order: action.payload,
        };
        case VIEW_PURCHASE:
        return {
          ...state,
          view_purchase: action.payload,
        };
        case GET_TRANSACTIONS:
          return {
            ...state,
            get_transactions: action.payload,
          };
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case GET_DRUG_LIST_COUNT:
      return {
        ...state,
        drugListCount: action.payload,
      };
    case DISPATCH_AMOUNT_PAID:
      return {
        ...state,
        amountPaid: action.payload,
      };
    case NUMBER_OF_OUT_OF_STOCK:
      return {
        ...state,
        numberOfOutOfStock: action.payload,
      };
    case TOTAL_EXPIRED_DRUGS:
      return {
        ...state,
        numberOfExpiredDrugs: action.payload,
      };
    case DISPATCH_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
      };
    case GET_TOTAL_DRUG:
      return {
        ...state,
        totalDrugs: action.payload,
      };
    case GET_STOCK_INFO:
      return {
        ...state,
        stockInfo: action.payload,
      };
    case GET_EXPIRY_ALERT:
      return {
        ...state,
        expiryAlert: action.payload,
      };
    case GET_REORDER_LEVEL:
      return {
        ...state,
        reorderLevel: action.payload,
      };
    case GET_TOP_SALES:
      return {
        ...state,
        topSales: action.payload,
      };
    case GET_STOCK_INFO_STORE:
      return {
        ...state,
        stockInfoStore: action.payload,
      };
    case GET_STOCK_INFO_STORE_SHELF:
      return {
        ...state,
        stockInfoShelf: action.payload,
      };
    case SALES:
      return {
        ...state,
        saleItems: action.payload,
      };
    case RECEIPT_DATA:
      return {
        ...state,
        receiptData: action.payload,
      };
    case PHARM_USER:
      return {
        ...state,
        pharmUsers: action.payload,
      };
    case GET_SUPPLIER_STATEMENT:
      return {
        ...state,
        supplierStatement: action.payload,
      };
    case GET_DRUG_LIST:
      return {
        ...state,
        drugList: action.payload,
      };
    case SUPPLIER_COUNT:
      return {
        ...state,
        supplierCount: action.payload,
      };
    case GET_PURCHASE_ITEM:
      return {
        ...state,
        purchaseItems: action.payload,
      };
    case GET_PHARM_STORE:
      return {
        ...state,
        pharmStore: action.payload,
      };
    case PHARM_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_CLIENT_INFO:
      return {
        ...state,
        clientInfo: action.payload,
      };
    case GET_CLIENT_STATEMENT:
      return {
        ...state,
        clientStatement: action.payload,
      };
    case EXPIRED_STOCKS:
      return {
        ...state,
        expired_stocks: action.payload,
      };
    case NA_STOCKS:
      return {
        ...state,
        na_stocks: action.payload,
      };
    default:
      return state;
  }
}
