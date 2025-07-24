import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "reactstrap";
import { CustomButton, CustomTable } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import Scrollbar from "../../../components/UI/Scrollbar";
import { getReorderLevel } from "../../../redux/action/pharmacy";

 function ReOderLevel() {
  const { reorderLevel } = useSelector((state) => state.pharmacy);
  const [show_search, setShowSh] = useState(false);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const info = useCallback(() => {
    dispatch(getReorderLevel());
  }, [dispatch]);
  useEffect(() => {
    info();
  }, [info]);
  const data =
    filterText.length > 0
      ? reorderLevel.filter(
          (item) =>
            item.drug_name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.generic_name.toLowerCase().includes(filterText.toLowerCase())
        )
      : reorderLevel;
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
        }
      ];
    
  return (
    <CustomCard header="Reorder alert">
      <Scrollbar height="88vh" autoHide>
        <CustomTable height={"75vh"} fields={view_fields} data={data} />
      </Scrollbar>
    </CustomCard>
  );
}

export default ReOderLevel;
