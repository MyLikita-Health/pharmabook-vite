import React, { useCallback, useEffect, useState } from "react";
import NewUserForm from "./NewUser";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../../hooks/useQuery";
import { CustomButton } from "../../../components/UI";
import {
  createUser,
  endpoint,
  getPharmUsers,
} from "../../../redux/action/pharmacy";
import { _fetchApi, _postApi } from "../../../redux/action/api";
import _customNotification from "../../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import { PHARM_LOADING } from "../../../redux/action/actionType";

const CreateUser = () => {
  const query = useQuery();
  const loading = useSelector((state) => state.pharmacy.loading);
  const { user } = useSelector((state) => state.auth);
  const userType = query.get("type") || "new_admin";
  const id = query.get("id");
  const { addToast } = useToasts();
  const { selectedUser } = useSelector((state) => state.pharmacy);
  const disabled = query.get("disabled");
  const _form = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    busName: "",
    address: "",
    role: "",
    store: user.store,
    accessTo: [],
    facilityId: user.facilityId,
    branch_name: user.branch_name,
    loading: false,
    message: "",
    userCheck: false,
  };
  const [form, setForm] = useState(
    disabled === "false"
      ? {
          username: selectedUser?.username,
          phone: selectedUser?.phone,
          role: selectedUser?.role,
          branch_name: selectedUser?.branch_name,
          accessTo: selectedUser?.accessTo.split(","),
        }
      : _form
  );
  // const getIds = useCallback(() => {
  //   if (user_id > 0)
  //     _fetchApi(
  //       `/${endpoint}/v1/user-id?id=${user_id}&facilityId=${user.facilityId}`,
  //       (data) => {
  //         console.log({ form: data.results[0] });
  //         if (data.results.length) {
  //           setForm((prev)=>({...prev, ...data.results[0], password: form.confirmPassword }));
  //         }
  //       }
  //     );
  // }, [form.confirmPassword, user.facilityId, user_id]);

  // useEffect(() => {
  //   getIds();
  // }, [getIds]);

  const _getPharmUsers = () => {
    dispatch(getPharmUsers());
  };

  const handleUpdate = () => {
    dispatch({ type: PHARM_LOADING, payload: true });
    _postApi(
      `/${endpoint}/v1/update-user?query_type=update&id=${id}&facilityId=${user.facilityId}`,
      form,
      (data) => {
        if (data.success) {
          _customNotification(addToast, "Updated", "success");
          _customNotification(addToast, "Updated", "success");
          _getPharmUsers();
          dispatch({ type: PHARM_LOADING, payload: false });
        }
      },
      (err) => {
        _customNotification(addToast, "Error occured", "error");
        console.log(err);
        dispatch({ type: PHARM_LOADING, payload: false });
      }
    );
  };
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!form.accessTo.length) {
      _customNotification(
        addToast,
        "Please add atleast one user's privilege",
        "warning"
      );
    } else {
      if (form.username === "" || form.phone === "") {
        if (form.branch_name === "") {
          _customNotification(addToast, "please select store", "warning");
        } else {
          _customNotification(addToast, "Incomplete form", "warning");
        }
      } else {
        if (form.message !== "Username already exists") {
          dispatch(
            createUser(
              form,
              () => {
                _customNotification(addToast, "Submitted", "success");
                setForm(_form);
                _getPharmUsers();
              },
              () => {
                _customNotification(addToast, "error Occured", "warning");
              },
              "new_from"
            )
          );
        } else {
          _customNotification(addToast, "Username already exist", "warning");
        }
      }
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === "username") {
      verifyUserName(target.value);
      setForm((p) => ({
        ...p,
        error: "",
        [target.name]: target.value,
      }));
    } else {
      setForm((p) => ({
        ...p,
        error: "",
        [target.name]: target.value,
      }));
    }
  };

  const handleTypeaheadChange = (val, name) => {
    console.log(val);
    if (val) {
      setForm((p) => ({
        ...p,
        [name]: val.store_name,
      }));
    }
  };

  const handleCheckboxChange = ({ target: { name } }) => {
    console.log(form.accessTo.includes(name));
    if (!form.accessTo.includes(name)) {
      setForm((prev) => ({ ...prev, accessTo: [...prev.accessTo, name] }));
    } else {
      setForm((prev) => ({
        ...prev,
        accessTo: prev.accessTo.filter((item) => item !== name),
      }));
    }
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
    <>
      <NewUserForm
        username={form.username}
        form={form}
        phone={form.phone}
        handleTypeaheadChange={handleTypeaheadChange}
        password={form.password}
        role={form.role}
        user={user}
        accessTo={form.accessTo}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        userType={userType}
        handleSubmit={handleSubmit}
        disabled={disabled}
        verifyUserName={verifyUserName}
        submit={
          <CustomButton
            loading={loading}
            type="submit"
            className="offset-md-5 col-md-2 offset-lg-5 col-lg-2"
            onClick={disabled === "false" ? handleUpdate : handleSubmit}
          >
            {disabled === "false" ? "Update" : "Submit"}
          </CustomButton>
        }
      />
    </>
  );
};

export default CreateUser;
