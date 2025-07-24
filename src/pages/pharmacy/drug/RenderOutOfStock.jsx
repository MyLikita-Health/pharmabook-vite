import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { CustomButton, CustomTable, SearchBar } from "../../../components/UI";
import CustomPagination from "../../../components/UI/CustomPagination";
import Scrollbar from "../../../components/UI/Scrollbar";
import {
  getPurchaseItem,
  countOutOfStock,
  searchOutOfStock,
} from "../../../redux/action/pharmacy";
import { formatNumber } from "../../../utils";
import StockReportPDF1 from "../StockReportPDF1";

export default function RenderOutOfStock() {
  const { na_stocks, numberOfOutOfStock } = useSelector(
    (state) => state.pharmacy
  );
  const { activeBusiness } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ from: 0, to: 100 });

  const [print, setPrint] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const view_fields = [
    {
      title: "S/N",
      custom: true,
      component: (item, idx) => idx + 1,
      className: "text-left",
    },

    { title: "Drug Name", value: "drug_name" },

    { title: "Generic Name", value: "generic_name" },
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
            // setStockItem(item)
            // setIndex(2);
          }}
        >
          Reorder
        </CustomButton>
      ),
      className: "text-center",
    },
  ];

  const getExhausted = useCallback(() => {
    // if(filterText.length>2){
      dispatch(searchOutOfStock({filterText}))
    // }
    dispatch(
      getPurchaseItem({ from: form.from, to: form.to, query_type: "na_stocks" })
    );
    dispatch(countOutOfStock({ filterText }));
  }, [dispatch, form.from, form.to, filterText]);

  useEffect(() => {
    getExhausted();
  }, [getExhausted]);

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      if (print) {
        setPrint(false);
      }
      setForm((p) => ({ from: (page - 1) * 100, to:  100 }));
      setCurrentPage(page);
    },
    [print]
  );

  return (
    <div className="bg-white">
      {/* {JSON.stringify(data)} */}
      {print ? (
        <Container>
          <Row>
            <Col md={3}>
              <CustomButton
                color="danger"
                outline
                onClick={() => setPrint(false)}
              >
                Close
              </CustomButton>{" "}
            </Col>{" "}
          </Row>
          <Col md={9} style={{ maxWidth: "60vw" }}>
            <StockReportPDF1
              list={na_stocks}
              range={form}
              activeBusiness={activeBusiness}
              total={formatNumber(numberOfOutOfStock)}
              title={"Out of stock"}
            />
          </Col>
        </Container>
      ) : (
        <div>
          <Row className="bg-white">
            {/* {JSON.stringify({ data })} */}
            <Col md={8}>
            <CustomPagination
            totalRecords={numberOfOutOfStock}
            pageLimit={20}
            pageNeighbours={7}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
            </Col>
            <Col md={2} className="pt-2">
              <strong>Total:</strong> {formatNumber(numberOfOutOfStock)}
            </Col>
            <Col md={2} className="text-end">
              <CustomButton onClick={() => setPrint(!print)} size="sm" outline>
                Print
              </CustomButton>
            </Col>
          </Row>
          
          <Scrollbar height={"75vh"}>
            <CustomTable
              height={"75vh"}
              fields={view_fields}
              data={na_stocks}
            />
          </Scrollbar>
        </div>
      )}
    </div>
  );
}
