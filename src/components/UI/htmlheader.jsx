import React from "react";
export const HtmlHeader = () => {
    return (
        <div className="main-container">
            <style>
                {`
            .main-container {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
              font-size: 11;
              color: grey;
          }
          .text{
            marginBottom: 3;
            font-size: 11;
          }
          .image: {
            width: 40rem;
            height: 26rem;
            marginTop: 0;
          }
            `}
            </style>
            <div>
                <img
                    className="image"
                    src={require("../../assets/img/logo-white-bg.png")}
                    alt="applogo"
                />
            </div>

            <div>
                <p className="text">Noor Takaful Insurance Ltd</p>
                <p className="text">62, SHIPEOLU STREET, PALMGROVE,</p>
                <p className="text">LAGOS.</p>
                <p className="text">TIN:18125767-000</p>
                <p className="text">www.noortakaful.ng</p>
                <p className="text">+2348099444448</p>
            </div>
        </div>
    );
};
