import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Checkbox, CustomButton, TextInput } from "../../../components/UI";
// import LoginImage from "../../../assets/images/login.jpeg";
import Logo from "../../../assets/images/new-logo.png";
import bg from "../../../assets/images/bg.jpg";
import bg11 from "../../../assets/images/login1.jpg";
import { Card, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "react-feather";
import { login } from "../../../redux/action/auth";
import CustomCard from "../../../components/UI/CustomCard";
import _customNotification from "../../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";
export const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
    remeberMe: false,
  });
  const [showPass, setShowPass] = useState(false);
  const showPassword = (e) => {
    e.preventDefault();
    setShowPass((p) => !p);
  };
  // const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      login(
        { username: form.username, password: form.password },
        (data) => {
          console.log(data);
          if (data && data.success) {
            setLoading(false);
            _customNotification(addToast, "Login succesfully ");
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
              _customNotification(addToast, "An error occured!", "warning");
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
  };
  useEffect(() => {
    let rem = localStorage.getItem("@@remembered");
    setForm((p) => ({ ...p, remeberMe: rem }));
  }, []);
  const onRemember = () => {
    setForm((p) => ({ ...p, remeberMe: !form.remeberMe }));
    localStorage.setItem("@@remembered", !form.remeberMe);
  };
  return (
    <div
      className="m-0"
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${bg11})`,
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
      <div className="col-md-8  col-sm-12 col-lg-4 w-full max-w-md space-y-0 shadow"> 
        <div>
          <CustomCard
            className="bg-default"
            style={{  opacity: 0.7, backgroundColor: "none" }}
          >
            <div className="text-center">
              <img
                src={Logo}
                alt="logo"
                className="text-center"
                style={{ width: "20vh", height: "20vh", marginTop: "1" }}
              />
            </div>
            <h2 className="mt-0 text-center text-3xl font-bold tracking-tight text-primary">
              Sign in
            </h2>
            <h6 className="text-center">Use your PharmaBooks account</h6>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Username
                    </Label>
                    <TextInput
                      placeholder="Username"
                     
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={({ target: { name, value } }) => {
                        setForm((p) => ({ ...p, [name]: value }));
                      }}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <FormGroup>
                  <div
                    style={
                      {
                        // display: "flex",
                        // justifyContent: "space-between",
                      }
                    }
                  >
                    <Label style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Password
                    </Label>
                    <TextInput
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={({ target: { name, value } }) => {
                        setForm((p) => ({ ...p, [name]: value }));
                      }}
                      required
                    />
                    <div className="d-flex justify-content-between">
                      <p
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                        className="text-primary"
                      >
                        Forgot Password?
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        className="text-primary"
                        onClick={() => {
                          navigate("/app/sign-up");
                        }}
                      >
                        Create Account
                      </p>
                    </div>
                  </div>
                </FormGroup>
              </Row>

              <Row style={{ margin: "2px" }} className="mt-1 mb-2">
                <Col md={3}></Col>
                <CustomButton
                  loading={loading}
                  className="shadow-sm"
                  type="submit"
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Sign In
                  </span>
                </CustomButton>
              </Row>
              <Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    checked={form.remeberMe}
                    onChange={onRemember}
                    label={
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
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
        </div>
      </div>
    </div>
  );
};
