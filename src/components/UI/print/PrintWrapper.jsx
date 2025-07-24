import React from "react";
import { useSelector } from "react-redux";

function PrintWrapper(props) {
  const facilityInfo = useSelector((state) => state.facility.info);

  return (
    <>
      <style>
        {`@media print {
              table {
                font-size: 75%;
                table-layout: fixed;
                width: 100%;
              }
              
              table {
                border-collapse: collapse;
                border-spacing: 2px;
              }
              
              th,
              td {
                border-width: 1px;
                padding: 0.5em;
                position: relative;
                text-align: left;
              }
              
              th,
                td {
                    border-radius: 0.25em;
                    border-style: solid;
                }
                
                th {
                    background: #EEE;
                    border-color: #BBB;
                }
                
                td {
                    border-color: #DDD;
                }
                .text-right {
                    text-align: right;
                }
                .text-center {
                    text-align: center;
                }
                .font-weight-bold {
                    font-weight: bold;
                }
                .print-start{
                    margin: 2em;
                    margin-top: 4em;
                }
                .print-only{
                  display: block;
                }
            }

            @media screen {
              .print-only{
                display: none;
              } 
           }   
          `}
      </style>

      <div className="print-start">
        <div className="print-only">
          <h3 className="text-center">{facilityInfo.printTitle}</h3>
          <h4 className="text-center">{facilityInfo.printSubtitle1}</h4>
          <h4 className="text-center">{facilityInfo.printSubtitle2}</h4>
          <h5 className="text-center">{props.title}</h5>
        </div>
        {props.children}
      </div>
    </>
  );
}

export default PrintWrapper;
