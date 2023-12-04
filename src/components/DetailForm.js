import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../redux/tasksSlice";
import {
  useLocation,
  useParams,
  useHistory,
  useNavigate,
  Link,
} from "react-router-dom";
import svgList from "../assets/svg/svg.json";

const DetailForm = (props) => {
  const tasksList = useSelector((state) => {
    return state.tasksList.value;
  });
  const dispatch = useDispatch();
  const params = useParams();
  const initialFormState = {
    project_name: "",
    submission_date: "",
    summary: "",
    attachment: [],
    description: "",
    status: "New",
    isFavourite: false,
  };
  const [inputField, setInputField] = useState(initialFormState);

  const location = useLocation();
  const navigate = useNavigate();
  //   const history = useHistory();ƒˇ
  // Access the pathname, search, and hash properties of the location object
  const { pathname } = location;
  useEffect(() => {
    console.log("A", props);
    console.log("B", params);
    console.log("C", pathname);
    if (pathname.includes("edit-task")) {
      setInputField(tasksList.find((data) => params.taskId == data.id));
    }
  }, []);

  useEffect(() => {
    return () => {
      setInputField(initialFormState);
    };
  }, []);

  const inputsHandler = (e) => {
    console.dir(e.target.files);
    if (e.target.type == "file") {
      let formattedFiles = [];
      for (let data of e.target.files) {
        formattedFiles.push(URL.createObjectURL(data));
      }
      // let formattedFiles = e.target.files.map((data) =>
      //   URL.createObjectURL(data)
      // );
      setInputField({ ...inputField, [e.target.name]: formattedFiles });
    } else {
      setInputField({ ...inputField, [e.target.name]: e.target.value });
    }
  };

  const submitButton = () => {
    console.log(inputField);
    pathname.includes("edit-task")
      ? dispatch(updateTask(inputField))
      : dispatch(addTask(inputField));
    navigate("/");
  };

  const deleteImages = (i) => {
    let formattedFiles = inputField.attachment;
    delete formattedFiles[i];
    setInputField({ ...inputField, attachment: formattedFiles });
  };

  return (
    <div>
      <div class="app-content">
        <div class="app-content-header mb-50">
          <h1 class="app-content-headerText">Add Task</h1>
        </div>

        <div class="form-group">
          <div className="text-right w-100">
            <button
              onClick={() =>
                setInputField((data) => ({
                  ...data,
                  isFavourite: !data.isFavourite,
                }))
              }
            >
              {inputField.isFavourite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </svg>
              )}
            </button>
          </div>
          <div className="form-control w-50">
            <h6 class="form-title">Project Name</h6>
            <select
              name="project_name"
              onChange={inputsHandler}
              value={inputField.project_name}
              className="w-100"
            >
              <option value=""></option>
              <option value="MyApp">My App</option>
            </select>
          </div>

          <div className="form-control w-25">
            <h6 class="form-title">Submission Date</h6>
            <input
              type="date"
              name="submission_date"
              onChange={inputsHandler}
              value={inputField.submission_date}
              className="w-100"
            />
          </div>
          <div className="form-control w-75">
            <h6 class="form-title">Summary</h6>
            <input
              type="text"
              name="summary"
              onChange={inputsHandler}
              value={inputField.summary}
              className="w-100"
            />
          </div>
          <div className="form-control w-75">
            <h6 class="form-title">Description</h6>
            <textarea
              name="description"
              cols="30"
              rows="10"
              onChange={inputsHandler}
              value={inputField.description}
              className="w-100"
            ></textarea>
          </div>
          <div className="form-control w-75">
            <h6 class="form-title">Attachment</h6>
            <input
              type="file"
              name="attachment"
              onChange={inputsHandler}
              multiple
              // value={inputField.attachment}
              className="w-100"
            />
            <div className="attached-images">
              {inputField.attachment &&
                inputField.attachment.map((data, i) => {
                  return (
                    <div key={i} className="attached-images-inner">
                      <img src={data} alt="" />
                      <button
                        onClick={() => deleteImages(i)}
                        dangerouslySetInnerHTML={{
                          __html: svgList["delete"],
                        }}
                      ></button>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="form-control text-right w-100">
            <Link to={"/"}>
              <button>Cancel</button>
            </Link>
            <button onClick={submitButton}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
