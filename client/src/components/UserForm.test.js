import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import FormikForm from "./UserForm";
import { add } from "./UserForm";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";

it("FormikForm renders", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormikForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("submit works", () => {
  const { getByText } = render(<FormikForm />);
  const submitButton = getByText(/^submit$/i);
  fireEvent.click(submitButton);
  getByText(/Recipes/);
});

test("add function", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(1, 7)).toEqual(8);
  expect(add(5, 2)).toBe(7);
});