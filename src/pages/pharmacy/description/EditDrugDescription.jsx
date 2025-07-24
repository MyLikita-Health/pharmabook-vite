import React, { useCallback, useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { CustomButton, CustomForm } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'
import _customNotification from '../../../components/UI/_customNotification'
import { apiURL, _postApi } from '../../../redux/action/api'
import { DrugList, endpoint } from '../../../redux/action/pharmacy'
import { useNavigate, useParams } from "react-router-dom";
import CustomTypeahead from "../../../components/UI/CustomTypeahead";
import store from '../../../redux/store'


export default function EditDrugDescription() {
  const facilityId = store.getState().auth.user.facilityId;

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const params = useParams()


  const uploadImage = useCallback(() => {
    const data = new FormData()
    data.append("file", image)
    console.log(image)
    data.append("upload_preset", "mylikita")
    data.append("cloud_name", "mylikita-healthtech")
    if (typeof image === "object") {
      fetch("https://api.cloudinary.com/v1_1/mylikita-healthtech/image/upload", {
        method: "post",
        body: data
      })
        .then(resp => resp.json())
        .then(data => {
          setForm((p) => ({ ...p, image: data.url }))
          setImage("")
        })
        .catch(err => console.log(err))
    }
  }, [image])

  useEffect(
    () => { uploadImage() }
    , [uploadImage]
  )
  const [form, setForm] = useState({
    name: "",
    generic_name: "",
    dosage: "",
    short_description: "",
    long_description: "",
    drug_usage: "",
    warning: "",
    ingredients: "",
    side_effect: "",
    image: "",
    drugCategory: ""
  })
  const navigate = useNavigate()
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const fields = [
    {
      label: "Drug Name (Brand Name)",
      name: "name",
      col: 4,
      value: form.name
    },
    {
      label: "Generic Name",
      name: "generic_name",
      col: 4,
      value: form.generic_name
    }, {
      type: "custom",
      component: () => <>
        <label className="mb-2">image</label>
        <input type="file" className="form form-control" onChange={(e) => {
          setImage(e.target.files[0]);
          uploadImage()
        }}></input>
      </>

    }, {
      type: "custom",
      component: () => <CustomTypeahead
        label="Drug Category"
        labelKey="name"
        options={category}
        allowNew
        onInputChange={(v) => {
          if (v.length) {
            setForm((p) => ({
              ...p,
              name: v,
            }));
          }
        }}
        onChange={(s) => {
          if (s.length) {
            console.log(s);
            setForm((p) => ({
              ...p,
              drugCategory: s[0].name,

            }));
          }
        }}
      />

    },
    {
      label: "Dosage",
      name: "dosage",
      col: 4,
      value: form.dosage
    },
    {
      label: "Short Description",
      name: "short_description",
      col: 4,
      value: form.short_description
    },
    {
      label: "Product Description",
      name: "long_description",
      type: "textarea",
      col: 4,
      value: form.long_description
    },
    {
      label: "Usage/Instruction",
      name: "drug_usage",
      type: "textarea",
      col: 4,
      value: form.drug_usage
    },
    {
      label: "Warnings",
      name: "warning",
      type: "textarea",
      col: 4,
      value: form.warning
    },
    {
      label: "Ingredients",
      name: "ingredients",
      type: "textarea",
      col: 4,
      value: form.ingredients
    },
    {
      label: "Side Effect",
      name: "side_effect",
      type: "textarea",
      col: 4,
      image: form.side_effect
    },
    // {
    //   label: "image",
    //   // name: "image",
    //   type: "file",
    //   custom: true,
    //   component: (e) => setImage(e.target.files[0]),
    //   col: 4,
    //   // value:form.image
    // },
  ]
  const [category, setCategory] = useState([])
  const getProductDescription = () => {
    _postApi(
      `/${endpoint}/v1/product-description?facilityId=${facilityId}&query_type=select`,
      // form,
      {},
      (data) => {
        if (data.success) {
          setCategory(data.results)
        }
      },
    )
    // )
  };

  useEffect(() => {
    getProductDescription();
  }, []);
  const handleChange = ({ target: { value, name } }) => {
    setForm((p) => ({ ...p, [name]: value }))

  }
  const handleSubmit = () => {
    // uploadImage()
    console.log(form)
    DrugList(
      form,
      (res) => {
        //   con
        if (res) {
          setLoading(false);
          _customNotification(addToast, "Successfully", "success");

        }
      },
      () => {
        setLoading(false);
        _customNotification(addToast, "Successfully Saved", "error");
      }
    );
    navigate(-1)


  }
  const [results, setResults] = useState([])
  const getIds = useCallback(() => {
    let id = params.id;

    _postApi(
      `/${endpoint}/v1/drugId?id=${id}`,
      // form,
      {},
      (data) => {
        setResults(data.results);
        console.log({ form: data.results[0] });
        if (data.results.length) {
          setForm(data.results[0]);
        }
      },
    )

    // )

  }, [params]);
  useEffect(() => {
    getIds();
  }, [getIds]);
  const handleUpdate = () => {
    let id = params.id;
    _postApi(
      `/${endpoint}/v1/drug-list?query_type=update&id=${id}`,
      form,
      (data) => {
        if (data.success) {
          alert("sucess");
          navigate(-1);
        }
      },
    )
  }
  return (
    <div>
      <CustomCard className="" header="Edit Drug Description" back>
        {/* {JSON.stringify(form)} */}
        <CustomForm fields={fields} handleChange={handleChange} />


        <img src={url} />
        <center><CustomButton onClick={params.id > 0 ? handleUpdate : handleSubmit} loading={loading}>{params.id > 0 ? "Update" : "Submit"}</CustomButton></center>

      </CustomCard>
    </div>
  )
}
