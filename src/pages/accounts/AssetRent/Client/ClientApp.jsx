import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewClent } from "../../../../redux/action/pharmacy";
import ClientForm from "./ClientForm";

import { useToasts } from "react-toast-notifications";
import _customNotification from "../../../../components/UI/_customNotification";
export default function ClientApp() {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [client, setClient] = useState({
    accType: "Family",
    clientAccno: "",
    beneficiaryNo: "",
    fullName: "",
    gender: "",
    date: "",
    maritalStatus: "",
    occupation: "",
    address: "",
    deposit: "",
    payment: "",
    contactDeposite: "",
    contactEmail: "",
    contactPhoneNumber: "",
    contactAddress: "",
    contactWebsite: "",
    contactName: "",
    contactType: "self",
    description: "Opening Balance",
    sourceAcct: "",
    acc_type: "",
    acc_name: "",
  });
  const handleClient = ({ target: { name, value } }) => {
    setClient((p) => ({ ...p, [name]: value }));
  };
  const { addToast } = useToasts();
  const handleSubmit = () => {
    setLoading(true);
    addNewClent(
      client,
      (res) => {
        if (res) {
          setLoading(false);
          _customNotification(addToast, "Succesfully Submit");
          navigate(-1)
        }
      },
      (err) => {
        _customNotification(addToast, "Error Occured");
        console.log(err);
        setLoading(false);
      }
    );
  };
  const handleContactTypeRadio = (n, v) => {
    console.log(v);
    setClient((p) => ({ ...p, contactType: v }));
  };
  return (
    <div>
      <ClientForm
        client={client}
        handleClient={handleClient}
        handleContactTypeRadio={handleContactTypeRadio}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
