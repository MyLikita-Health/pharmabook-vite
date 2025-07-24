import React, { useState, useEffect } from "react";
import { Col, Input, Row, InputGroup, InputGroupText } from "reactstrap";
import { CustomButton, CustomForm, TextInput } from "../../components/UI";
import CustomCard from "../../components/UI/CustomCard";
import Switch from "react-switch";
import { apiURL, _postApi } from "../../redux/action/api";
import { endpoint } from "../../redux/action/pharmacy";
import { getImageUrl } from "../../redux/action/api";
import "./wow.css";
import { useDispatch, useSelector } from "react-redux";
import _customNotification from "../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import { ACTIVEBUSINESS } from "../../redux/action/actionType";
export default function StoreSetup() {
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubtLoading] = useState(false);
  const [state, setState] = useState(false);
  const [edit, setEdit] = useState(null);
  const { user, activeBusiness } = useSelector((s) => s.auth);
  const { addToast } = useToasts();
  const [form, setForm] = useState(activeBusiness);
  const dispatch = useDispatch();
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const [image, setImage] = useState();
  function handleImage(e) {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setState(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const fields = [
    {
      label: "Pharmacy Name",
      name: "pharmacy_name",
      value: form.pharmacy_name,
      col: 6,
      disabled: edit ? false : true,
    },
    // {
    //   label: "Description",
    //   name: "description",
    //   value: form.description,
    //   disabled: edit ? false : true,
    //   col: 6,
    // },
    {
      label: "State of Practice",
      name: "state_of_practice",
      value: form.state_of_practice,
      col: 6,
      disabled: edit ? false : true,
    },
    {
      label: "Pharmacy address",
      name: "pharmacy_address",
      value: form.pharmacy_address,
      col: 6,
      disabled: edit ? false : true,
    },
    {
      label: "Residance name",
      name: "residance_name",
      value: form.residance_name,
      col: 6,
      disabled: edit ? false : true,
    },
  ];
  const uploadLogo = () => {
    setLoading(true);
    const data = new FormData();
    data.append("image", image);
    data.append("state", state);
    Object.keys(form).forEach((i) => data.append(i, form[i]));

    fetch(
      `${apiURL}/pharmacy/v1/update-bussiness?facilityId=${user.facilityId}`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          _customNotification(
            addToast,
            "Logo successfully uploaded",
            "success"
          );
          _customNotification(
            addToast,
            "Logo successfully uploaded",
            "success"
          );
          setLoading(false);
          dispatch({
            type: ACTIVEBUSINESS,
            payload: { ...activeBusiness, pharmacy_logo: data.filename },
          });
        }
      })
      .catch((err) => {
        alert("An Error Occured");
        setLoading(false);
      });
  };
  const handleSubmit = () => {
    setSubtLoading(true);
    _postApi(
      `/pharmacy/v1/update-biz-profile?facilityId=${user.facilityId}`,
      form,
      (data) => {
        if (data.success) {
          _customNotification(addToast, "Successfully", "success");
          _customNotification(addToast, "Successfully", "success");
          setSubtLoading(false);
          dispatch({
            type: ACTIVEBUSINESS,
            payload: form,
          });
        } else {
          _customNotification(addToast, "Error occurred", "warning");
          _customNotification(addToast, "Error occurred", "warning");
          setSubtLoading(false);
        }
      },
      (err) => {
        alert("An Error Occured");
        console.log(err);
        setSubtLoading(false);
      }
    );
  };
  return (
    <div>
      <Row>
        <Col md={5}>
          {" "}
          <CustomButton
            size="sm"
            outline
            onClick={() => setEdit(!edit)}
            classNme="mt-3"
          >
            {edit ? "Readonly" : "Edit"}
          </CustomButton>
        </Col>
        <div className="profile-pic-wrapper">
          <div className="pic-holder">
            <label for="newProfilePhoto" className="upload-file-block">
              Upload image
            </label>
            <input
              className="uploadProfileInput"
              type="file"
              name="profile_pic"
              id="newProfilePhoto"
              style={{ display: "none" }}
              onChange={handleImage}
              accept="image/jpg, image/png"
            />
            <>
              {state ? (
                <img
                  src={state}
                  alt=""
                  style={{
                    width: "190px",
                    height: "150px",
                  }}
                  title="Upload image"
                />
              ) : (
                <img
                  alt=""
                  title="Upload image"
                  style={{
                    width: "190px",
                    height: "150px",
                  }}
                  src={activeBusiness.pharmacy_logo}
                  className="rounded"
                />
              )}
            </>
          </div>
        </div>
        <div className="profile-pic-wrapper mt-1">
          <CustomButton loading={loading} onClick={uploadLogo} outline>
            Upload
          </CustomButton>
        </div>
      </Row>
      <CustomForm fields={fields} handleChange={handleChange} />
      <div>
        Outline Store Listing
        <Switch
          disabled={edit ? false : true}
          checked={form.outline_store_listing}
          // onChange={() => {
          //   setForm((p) => ({
          //     ...p,
          //     outline_store_listing: !p.outline_store_listing,
          //   }));
          // }}
          onColor="#007BFF"
          height={20}
          onChange={() => alert("comming soon")}
        />
      </div>
      <div>
        Enable Dedicated Link
        <Switch
          checked={form.enable_delicate_link}
          disabled={edit ? false : true}
          // onChange={() => {
          // setForm((p) => ({
          //   ...p,
          //   enable_delicate_link: !p.enable_delicate_link,
          //   store_id:
          //     p.store_id && p.store_id !== ""
          //       ? p.store_id
          //       : p.business_name.split(" ").join("-").toLowerCase(),
          // }));

          // }}
          onChange={() => alert("comming soon")}
          onColor="#007BFF"
          height={20}
          className="mt-2"
        />
        {form.enable_delicate_link === true ? (
          <div className="col-md-4">
            {" "}
            <InputGroup>
              <InputGroupText>https:/pharmacy.MyLikita Health/</InputGroupText>
              <Input
                name="store_id"
                value={form.store_id.split(" ").join("-").toLowerCase()}
                onChange={() => alert("comming soon")}
              />
            </InputGroup>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        Enable Email Notification
        <Switch
          disabled={edit ? false : true}
          checked={form.enable_Email_notification}
          onChange={() => {
            // setForm((p) => ({
            //   ...p,
            //   enable_Email_notification: !p.enable_Email_notification,
            // }));
            alert("comming soon");
          }}
          onColor="#007BFF"
          height={20}
          className="mb-2"
        />
        {form.enable_Email_notification === true ? (
          <div className="col-md-4">
            {" "}
            <label>email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="h5 p-1 bg-dark text-white m-0 p-0 text-center rounded col-md-4 mt-4">
        License Info:
      </div>
      <Row className="mt-5">
        <Col md={6}>
          <label>Pharmacist Name</label>
          <TextInput
            name="pharmacist_name"
            value={form.pharmacist_name}
            onChange={handleChange}
            disabled={edit ? false : true}
          />
        </Col>
        <Col md={6}>
          <label>PCN Registration NO</label>
          <TextInput
            name="pcn_number"
            value={form.pcn_number}
            onChange={handleChange}
            disabled={edit ? false : true}
          />
        </Col>
        <Col md={12}>
          <label>Short Bio(optional)</label>
          <TextInput
            type="textarea"
            name="short_bio"
            value={form.short_bio}
            onChange={handleChange}
            disabled={edit ? false : true}
          />
        </Col>
      </Row>
      <center>
        <CustomButton
          className="mt-3"
          loading={subLoading}
          onClick={handleSubmit}
        >
          Update
        </CustomButton>
      </center>
    </div>
  );
}
