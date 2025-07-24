import { checkStrEmpty } from "../../utils/index";
import React, { memo } from "react";
import { Alert, Table } from "reactstrap";

function CustomTable(props) {
  const {
    fields = [],
    data = [],
    hearderStyle,
    height = "50vh",
    size = "sm",
    preheader = true,
  } = props;
  return (
    <div style={{ height }}>
      <Table {...props} size={size} bordered>
        {preheader ? (
          <thead style={hearderStyle ? hearderStyle : {}}>
            <tr>
              {fields.map((_item, _idx) => (
                <th key={_idx} className="text-center">
                  {_item.title}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {data.map(
            (item, idx) =>
              item && (
                <tr key={idx}>
                  {fields.map((_item, _idx) => {
                    let val = item[_item.value] || "";
                    let value_alt =
                      (_item.value_alt && item[_item.value_alt]) || "";
                    let _className = _item.className ? _item.className : "";
                    if (_item.custom) {
                      return (
                        <>
                          <td className={_item.className}>
                            {_item.component(item, idx)}
                          </td>
                        </>
                      );
                    } else {
                      return (
                        <td key={_idx} className={_className}>
                          {checkStrEmpty(val) ? value_alt : val || "-"}
                        </td>
                      );
                    }
                  })}
                </tr>
              )
          )}
        </tbody>
      
      </Table>
      {data.length ? (
          ""
        ) : (
          <Alert color="warning" className="text-center">
            No record found
          </Alert>
        )}
    </div>
  );
}

export default memo(CustomTable);
