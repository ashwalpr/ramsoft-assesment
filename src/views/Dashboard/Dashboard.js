import { useDispatch, useSelector } from "react-redux";
import { DASHBOARD_TABLE_HEADER, MENU_LIST } from "../../assets/data/dashboard";
import { addTask, deleteTask, updateTask } from "../../redux/tasksSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import svgList from "../../assets/svg/svg.json";

export const Dashboard = (props) => {
  const tasksList = useSelector((state) => {
    return state.tasksList.value;
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [tasksListInner, setTasksListInner] = useState(tasksList);
  const [dashboardTableHeader, setDashboardTableHeader] = useState(
    DASHBOARD_TABLE_HEADER
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParamSearch = queryParams.get("search");
    const queryParamSortType = queryParams.get("sortType");
    const queryParamSortKeyName = queryParams.get("sortKeyName");
    let formatData = JSON.parse(JSON.stringify(tasksList));

    if (queryParamSearch) {
      formatData = formatData.filter((data) =>
        Object.values(data)
          .join("")
          .toLocaleLowerCase()
          .includes(queryParamSearch.toLocaleLowerCase())
      );
    }

    if (queryParamSortType) {
      setDashboardTableHeader((data) =>
        DASHBOARD_TABLE_HEADER.map((mapData) =>
          queryParamSortKeyName == mapData.keyName
            ? { ...mapData, sort: queryParamSortType }
            : mapData
        )
      );
      if (queryParamSortType == "ASC") {
        formatData.sort((a, b) =>
          a[queryParamSortKeyName] < b[queryParamSortKeyName] ? -1 : 1
        );
      } else {
        formatData.sort((a, b) =>
          a[queryParamSortKeyName] > b[queryParamSortKeyName] ? -1 : 1
        );
      }
    }
    setTasksListInner(formatData);
  }, [tasksList, location.search]);

  const handleSortSearch = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(params).forEach((data) => {
      if (params[data]) {
        searchParams.set(data, params[data]);
      } else {
        searchParams.delete(data);
      }
    });

    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <div className="app-container">
      <div className="sidebar" data-testid="sidebar">
        <div className="sidebar-header">
          <div
            className="app-icon"
            dangerouslySetInnerHTML={{
              __html: svgList["logo"],
            }}
          ></div>
        </div>
        <ul className="sidebar-list">
          {MENU_LIST.map((data, i) => (
            <li
              key={i}
              className="sidebar-list-item"
              data-testid="sidebarMenuList"
            >
              <a href="#" key={data.id}>
                <div dangerouslySetInnerHTML={{ __html: data.svg }} />

                <span>{data.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="app-content" data-testid="app-content">
        <div className="app-content-header" data-testid="app-content-header">
          <h1 className="app-content-headerText">Products</h1>
          <Link to={"/add-task"}>
            <button className="app-content-headerButton">Add Product</button>
          </Link>
        </div>
        <div className="app-content-actions" data-testid="app-content-actions">
          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
            onChange={(e) => handleSortSearch({ search: e.target.value })}
          />
        </div>
        <div
          className="products-area-wrapper tableView"
          data-testid="products-area-wrapper"
        >
          <div className="products-header">
            {dashboardTableHeader.map((data) => (
              <div key={data.id} className="product-cell image">
                {data.title}
                <button
                  className="sort-button"
                  onClick={() =>
                    handleSortSearch({
                      sortType: data.sort != "ASC" ? "ASC" : "DESC",
                      sortKeyName: data.keyName,
                    })
                  }
                >
                  {data.sort == "none" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                      />
                    </svg>
                  ) : data.sort == "ASC" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          {tasksListInner.map((data) => (
            <div className="products-row" key={data.id} data-testid="taskRow">
              <div className="product-cell">{data.project_name}</div>
              <div className="product-cell">{data.summary}</div>
              <div className="product-cell">{data.submission_date}</div>
              <div className="product-cell">{data.description}</div>
              <div className="product-cell">{data.description}</div>
              <div className="product-cell">{data.status}</div>
              <div className="product-cell">
                <button
                  onClick={() =>
                    dispatch(
                      updateTask({ ...data, isFavourite: !data.isFavourite })
                    )
                  }
                  dangerouslySetInnerHTML={{
                    __html: data.isFavourite
                      ? svgList["favouriteFull"]
                      : svgList["favouriteEmpty"],
                  }}
                ></button>
                {/* <div
                  id="svgContainer"
                  dangerouslySetInnerHTML={{ __html: svgList["favouriteFull"] }}
                ></div> */}
                <Link to={`/edit-task/${data.id}`}>
                  <button
                    dangerouslySetInnerHTML={{
                      __html: svgList["edit"],
                    }}
                  ></button>
                </Link>
                <button
                  onClick={() => dispatch(deleteTask(data.id))}
                  dangerouslySetInnerHTML={{
                    __html: svgList["delete"],
                  }}
                  data-testid="deleteTask"
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
