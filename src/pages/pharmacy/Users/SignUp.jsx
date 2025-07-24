import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Checkbox, CustomButton, TextInput } from "../../../components/UI";
// import LoginImage from "../../../assets/images/login.png";
import Logo from "../../../assets/images/login.jpeg";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/action/auth";
import moment from "moment";
import { _fetchApi, _postApi } from "../../../redux/action/api";
import bg from "../../../assets/images/login2.jpg";
import CustomCard from "../../../components/UI/CustomCard";
import _customNotification from "../../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import { routes } from "../../../components/Navbars/NavItems";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    pharmName: "",
    pharmAddress: "",
    pharmPrefix: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    date: moment().format("YYYY-MM-DD"),
    remeberMe: false,
    message: "",
    loading: false,
    userCheck: false,
  });
  useEffect(() => {
    let rem = localStorage.getItem("@@remembered");
    setForm((p) => ({ ...p, remeberMe: rem }));
  }, []);
  const onRemember = () => {
    setForm((p) => ({ ...p, remeberMe: !form.remeberMe }));
    localStorage.setItem("@@remembered", !form.remeberMe);
  };
  // const { addToast } = useToasts();

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      ...form,
      busName: form.pharmName,
      businessType: "Pharmacy",
      address: form.pharmAddress,
      status: "",
      role: "Pharmacy Owner",
      date: form.date,
      store: form.pharmName,
      accessTo: routes.map((item) => item.label),
      functionality: "",
      firstname: form.firstName,
      lastname: form.lastName,
      branch_name: form.pharmName,
      query_type: "new_admin",
      business_includes_logistics: false,
    };

    _postApi(
      "/users/create",
      obj,
      (d) => {
        console.log(d);
        if (d.success) {
          dispatch(
            login(
              { username: form.username, password: form.password },
              (data) => {
                console.log(data);
                if (data && data.success) {
                  setLoading(false);
                  _customNotification(addToast, "Account successfully created");
                  navigate("/app/pharmacy/dashboard?type=Dashboard&active=Dashboard");
                } else {
                  if (data) {
                    _customNotification(
                      addToast,
                      JSON.stringify(Object.values(data)[0]),
                      "warning"
                    );
                    setLoading(false);
                  } else {
                    setLoading(false);
                    _customNotification(
                      addToast,
                      "An error occured!",
                      "warning"
                    );
                  }
                }
              },
              (err) => {
                _customNotification(
                  addToast,
                  JSON.stringify(Object.values(err)[0]) || "error occured",
                  "warning"
                );
                setLoading(false);
                console.log("err", err);
              }
            )
          );
        } else {
          _customNotification(addToast, d.msg, "warning");
        }
      },
      () => {
        alert("An error occurred");
      }
    );
  };
  const verifyUserName = (username) => {
    setForm((p) => ({ ...p, loading: true }));
    _fetchApi(
      `/v1/username-verification?username=${username}`,
      (res) => {
        console.log(res);
        if (res.success) {
          setForm((p) => ({ ...p, message: res.msg, userCheck: true }));
          setForm((p) => ({ ...p, loading: false }));
        } else {
          setForm((p) => ({
            ...p,
            loading: false,
            message: res.msg,
            userCheck: false,
          }));
        }
      },
      (err) => {
        setForm((p) => ({ ...p, loading: false }));
        _customNotification(addToast, "Error Occured", "warning");
      }
    );
  };
  return (
    <div
    className="m-0"
    style={{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
    >
      <div className="col-md-8 col-sm-7 col-lg-8 w-full max-w-md space-y-0 shadow"> 
        <div
          
        >
          {/* <div className="text-center">
            <img
              src={Logo}
              alt="logo"
              className="text-center"
              style={{ width: "30vh", height: "10vh" }}
            />
          </div> */}
          <CustomCard
            className="bg-default"
            style={{ opacity: 0.7, backgroundColor: "none" }}
          >
            <div
              className="text-primary text-center"
              style={{ fontWeight: "bold", fontSize: "20px", marginBottom: 20 }}
            >
              Pharmacy Registration
            </div>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <h5 className="text-">Pharmacy Information</h5>
                  <FormGroup>
                    <TextInput
                      type="text"
                      name="pharmName"
                      placeholder="Pharmacy Name"
                      value={form.pharmName}
                      onChange={({ target: { name, value } }) => {
                        setForm((p) => ({ ...p, [name]: value }));
                      }}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    ></div>
                    <TextInput
                      type="text"
                      name="pharmPrefix"
                      placeholder="Prefix (Pharmacy File Format)"
                      value={form.pharmPrefix}
                      onChange={({ target: { name, value } }) => {
                        setForm((p) => ({ ...p, [name]: value }));
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    ></div>
                    <TextInput
                      type="text"
                      name="pharmAddress"
                      placeholder="Pharmacy Address"
                      value={form.pharmAddress}
                      onChange={({ target: { name, value } }) => {
                        setForm((p) => ({ ...p, [name]: value }));
                      }}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <h5>User Information</h5>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <TextInput
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={form.firstName}
                          onChange={({ target: { name, value } }) => {
                            setForm((p) => ({ ...p, [name]: value }));
                          }}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        ></div>
                        <TextInput
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={({ target: { name, value } }) => {
                            setForm((p) => ({ ...p, [name]: value }));
                          }}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        ></div>
                        <TextInput
                          type="text"
                          name="username"
                          placeholder="username"
                          value={form.username}
                          onChange={({ target: { name, value } }) => {
                            setForm((p) => ({ ...p, [name]: value }));
                            verifyUserName(value);
                          }}
                          required
                          loading={form.loading}
                          message={form.message}
                          good={form.userCheck}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <TextInput
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={form.lastName}
                          onChange={({ target: { name, value } }) => {
                            setForm((p) => ({ ...p, [name]: value }));
                          }}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        ></div>
                        <TextInput
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={({ target: { name, value } }) => {
                            setForm((p) => ({ ...p, [name]: value }));
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        ></div>
                        <TextInput
                          placeholder="Password"
                          type="password"
                          name="password"
                          required
                          value={form.password}
                          onChange={({ target: { name, value } }) => {
                            setForm((p) => ({ ...p, [name]: value }));
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row></Row>
              <Row style={{ margin: "2px" }} className="mt-1 mb-2">
                <CustomButton
                  loading={loading}
                  className="shadow-sm"
                  type="submit"
                >
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Sign Up
                  </span>
                </CustomButton>
              </Row>
              <Row>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Checkbox
                    checked={form.remeberMe}
                    onChange={onRemember}
                    label={
                      <span
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                        className="text-"
                      >
                        Remember me
                      </span>
                    }
                  />
                  <Label
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                    className="text-primary"
                  >
                    Need Help?
                  </Label>
                </div>
              </Row>
            </Form>
          </CustomCard>
          <CustomCard
            className="bg-default "
            style={{
              opacity: 0.7,
              backgroundColor: "none",
              marginTop: "10px", 
            }}
          >
            <div
              className="text-center"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Or{" "}
              <Label
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/app/login")}
              >
                click here
              </Label>{" "}
              to sign in.
            </div>
          </CustomCard>
        </div>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default SignUp;
