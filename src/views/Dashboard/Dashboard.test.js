// Dashboard.test.js
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import { store } from "../../redux/store";
import { BrowserRouter as Router } from "react-router-dom";

it("renders dashboard component with initial state", () => {
  render(
    <Router>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});

it("renders dashboard component with initial state", () => {
  render(
    <Router>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );
  const headingElement = screen.getAllByTestId("sidebarMenuList");
  expect(headingElement.length).toBe(1);
});

it("render the reducx", () => {
  render(
    <Router>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );

  const tasksListInner = screen.getAllByTestId("taskRow");
  console.log("chelen", tasksListInner.length);
  expect(tasksListInner.length).toBe(6);
});
it("render the reducx", () => {
  render(
    <Router>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );

  let tasksListInner = screen.getAllByTestId("taskRow");

  expect(tasksListInner.length).toBe(6);

  const deleteButton = screen.getAllByTestId("deleteTask");
  fireEvent.click(deleteButton[0]);
  tasksListInner = screen.getAllByTestId("taskRow");
  expect(tasksListInner.length).toBe(5);
});
