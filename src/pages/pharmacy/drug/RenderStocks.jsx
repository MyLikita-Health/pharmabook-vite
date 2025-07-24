import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { CustomButton, CustomTable, SearchBar } from "../../../components/UI";
import CustomPagination from "../../../components/UI/CustomPagination";
import Scrollbar from "../../../components/UI/Scrollbar";
import { getPurchaseItem, totalExpiredDrugs } from "../../../redux/action/pharmacy";
import { formatNumber } from "../../../utils";
import StockReportPDF from "../../pharmacy/StockReportPDF";
import StockReportPDF1 from "../StockReportPDF1";

export default function RenderStocks() {
  const { expired_stocks,numberOfExpiredDrugs } = useSelector((state) => state.pharmacy);
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
      title: "Quantity",
      custom: true,
      component: (item) => item.balance,
      className: "text-center",
    },
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

  const getExpired = useCallback(() => {
    dispatch(
      getPurchaseItem({ from: form.from, to: form.to, query_type: "expired" })
    );
    dispatch(totalExpiredDrugs({filterText}))
  }, [dispatch, filterText, form.from, form.to]);

  useEffect(() => {
    getExpired();
  }, [getExpired]);

  
  const onPageChanged = useCallback((event, page) => {
    event.preventDefault();
    setForm((p) => ({ from: (page - 1) * 100, to: 100 }));
    setCurrentPage(page);
  }, []);

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
            <StockReportPDF
              list={expired_stocks}
              range={form}
              activeBusiness={activeBusiness}
              total={formatNumber(numberOfExpiredDrugs)}
              title={"Expired drugs"}
            />
          </Col>
        </Container>
      ) : (
        <div>
          <Row className="bg-white">
            {/* {JSON.stringify({ data })} */}
            <Col md={8}>
              <CustomPagination
                totalRecords={numberOfExpiredDrugs}
                pageLimit={20}
                pageNeighbours={7}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
              />
            </Col>
            <Col md={2} className="pt-2">
              <strong>Total:</strong> {formatNumber(numberOfExpiredDrugs)}
            </Col>
            <Col md={2} className="text-end">
              <CustomButton onClick={() => setPrint(!print)} size="sm" outline>
                Print
              </CustomButton>
            </Col>
          </Row>

          <Scrollbar height={"75vh"}>
            <CustomTable height={"75vh"} fields={view_fields} data={expired_stocks} />
          </Scrollbar>
        </div>
      )}
    </div>
  );
}
