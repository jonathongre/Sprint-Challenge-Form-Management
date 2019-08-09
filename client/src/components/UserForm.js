import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ errors, touched, status }) {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        if (status) {
          setRecipes([...status]);
        }
      }, [status]);
      return (
        <>
          <Form className='formContainer'>
            <label>
              <h4>Username</h4>
              {touched.username && errors.username && (
                <p className="errors">{errors.username}</p>
              )}
              <Field type="text" name="username" placeholder="Username" />
            </label>
            <label>
              <h4>Password</h4>
              {touched.password && errors.password && (
                <p className="errors">{errors.password}</p>
              )}
              <Field type="password" name="password" placeholder="Password" />
            </label>
            <button type="submit">Submit</button>
          </Form>
          <h1>Recipes</h1>
      {recipes
        ? recipes.map(recipe => (
            <div key={Date.now() + Math.random(10000)} className="recipes">
              <div className='recipeTitle'>
              <h2>Name: {recipe.name}</h2>
              <h3>Course: {recipe.course}</h3>
              <h3>Technique: {recipe.technique}</h3>
              </div>
              <h4>Ingredients: {recipe.ingredients}</h4>
                </div>
              ))
            : null}
        </>
      );
    }
    
    const FormikForm = withFormik({
    
      enableReinitialize: true,
      mapPropsToValues: ({ username, password }) => {
        return {
          username: "",
          password: "",
        };
      },
      validationSchema: Yup.object().shape({
        username: Yup.string()
          .min(6, "Username must be at least 6 characters")
          .required("Please Provide A Valid Username"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Please Provide Your Password")
      }),
      handleSubmit(values, { resetForm, setStatus }) {
        axios
          .post("http://localhost:5000/api/register", {
            username: values.username,
            password: values.password
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        resetForm();
        axios
          .get("http://localhost:5000/api/restricted/data")
          .then(response => {
            setStatus(response.data);
            console.log(response.data)
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    })(UserForm);
    
    export default FormikForm;

    export const add = (num1, num2) => num1 + num2;