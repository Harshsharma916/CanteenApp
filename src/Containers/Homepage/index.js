import Footer from "../../Components/Footer";
import styled from "styled-components";
import { Button, Text, Wrapper } from "../../Components/ExportStyles";
import Header from "../../Components/Header";
import bgimg from "../../Images/bgimg.svg";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { get } from "loadsh";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { notification } from "antd";
import { AxiosGet, AxiosPost, URL } from "../../Components/Apicaller";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
// import env from "react-dotenv";

const Subdiv = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5%;

  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
  }
  .bgimg {
    width: 580px;
  }
`;

const Inputdiv = styled.div`
  display: flex;
  // border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  position: relative;

  .input {
    border-radius: 5px;
    padding: 25px;
    width: 80%;
    border: none;
    font-size: 25px;
  }
  .input::placeholder {
    font-size: 25px;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: white;
    background: #fe724d;
    width: 20%;
    font-size: 30px;

    &:hover {
      cursor: pointer;
      transform: scale(${(props) => props.scale});
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .dropdown {
    position: absolute;
    z-index: 3;
    top: 80px;
    background: white;
    padding: 10px 80px;
    display: flex;
    flex-direction: column;
  }
`;
const About = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
  padding: 100px 5%;
`;

const Form = styled.form`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  display: flex;
  width: 600px;
  height: 650px;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  background: white;

  .form-input {
    padding: 15px;
    font-size: 15px;
    width: 60%;
  }
  .form-input-error {
    padding: 15px;
    font-size: 15px;
    width: 65%;
    border: 1px red solid;
  }

  .closeButton {
    position: absolute;
    zindex: 2;
    top: 20px;
    left: 25px;
    padding: 10px;

    :hover {
      background: #a0a0a0;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const Homepage = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginClicked, toggleLogin] = useState(true);
  const [signUpClicked, toggleSignup] = useState(false);
  const [college, findCollege] = useState("");
	const [collegeList,setCollegeList] = useState({});

  useEffect(() => {
    async function collegeapi() {
      const response = await AxiosGet("");
			if (response.status == "success"){
				setCollegeList(response.data)
			} 
    }
		collegeapi()
  }, []);

  const colleges = [
   "IIT ROORKEE" , "IIT BOMBAY"
  ];
  // const collegeID = ['622bd54dbf985e0ddb37462b','']

  const handleValidate = (value) => {
    const errors = {};
    if (!value.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    if (!value.password || !value.confirmPassword) {
      errors.password = "Required";
    } else if (value.password != value.confirmPassword) {
      errors.confirmPassword = "Please enter the same password";
    }
    if (!value.contact) {
      errors.contact = "Required";
    } else if (value.contact.length != 10) {
      errors.contact = "Please enter correct contact number";
    }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    if (values.name) {
      setLoading(true);
      const data = { ...values, collegeId: "622bd54dbf985e0ddb37462b" };
      try {
        console.log("SIGNUP");
        dispach({ type: "signup", data: values });
        const response = await AxiosPost(
          "https://grub-it.herokuapp.com/api/v1/user/signup",
          data
        );
        if (response.status == "success") {
          setLoading(false);
          notification.success({
            message: "Successfully Signed up!",
          });
          navigate("/home");
        }
      } catch (err) {
        setLoading(false);
        notification.error({
          message: get(err, "response.data.message", "Error"),
        });
      }
    } else {
      setLoading(true);
      try {
        // const user = await api.post("/api/v1/user/login", values);
        // if (cookie.session) {
        //   removeCookie("session");
        // }
        // setCookie(
        //   "session",
        //   { token: get(user, "data.token"), path: "/home" },
        //   {
        //     maxAge: 24 * 60 * 60,
        //   }
        // );
        // dispach(setAuth({ user: get(user, "data.data.user") }));
        const response = await AxiosPost(
          "https://grub-it.herokuapp.com/api/v1/user/login",
          values
        );
        if (response.status == "success") {
          setLoading(false);
          dispach({ type: "login", data: response?.data?.user });
          notification.success({
            message: "Successfully Logged In!",
          });
          navigate("/home");
        }
      } catch (err) {
        setLoading(false);
        notification.error({
          message: get(err, "response.data.message", "Error"),
        });
      }
    }
  };

  return (
    <>
      <Header toggleLogin={toggleLogin} toggleSignup={toggleSignup} />
      <Wrapper>
        {loginClicked ? (
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={handleValidate}
            onSubmit={handleOnSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <CloseOutlined
                  className="closeButton"
                  onClick={() =>
                    toggleLogin((prevState) => {
                      return !prevState;
                    })
                  }
                />
                <Text
                  color="#FE724D"
                  size="40px"
                  weight="600"
                  style={{ marginBottom: "20px" }}
                >
                  LOGIN
                </Text>
                <input
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  className={
                    errors.email && touched.email
                      ? "form-input-error"
                      : "form-input"
                  }
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  value={values.password}
                  className={
                    errors.password && touched.password
                      ? "form-input-error"
                      : "form-input"
                  }
                  onChange={handleChange}
                />
                <Button
                  style={{ width: "65%", marginTop: "20px" }}
                  type={"submit"}
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          ""
        )}
        {signUpClicked ? (
          <Formik
            initialValues={{
              email: "",
              password: "",
              contact: "",
              confirmPassword: "",
              name: "",
            }}
            validate={handleValidate}
            onSubmit={handleOnSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <CloseOutlined
                  className="closeButton"
                  onClick={() =>
                    toggleSignup((prevState) => {
                      return !prevState;
                    })
                  }
                />
                <Text
                  color="#FE724D"
                  size="40px"
                  weight="600"
                  style={{ marginBottom: "20px" }}
                >
                  SIGN UP
                </Text>
                <input
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  value={values.name}
                  onChange={handleChange}
                />
                <input
                  name="contact"
                  className={
                    errors.contact && touched.contact
                      ? "form-input-error"
                      : "form-input"
                  }
                  placeholder="Contact"
                  value={values.contact}
                  onChange={handleChange}
                />
                <input
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  className={
                    errors.email && touched.email
                      ? "form-input-error"
                      : "form-input"
                  }
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  style={{ marginTop: "18px" }}
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  value={values.password}
                  className={
                    errors.password && touched.password
                      ? "form-input-error"
                      : "form-input"
                  }
                  onChange={handleChange}
                />
                <input
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "form-input-error"
                      : "form-input"
                  }
                  onChange={handleChange}
                />
                <Button
                  style={{ width: "65%", marginTop: "20px" }}
                  type={"submit"}
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          ""
        )}
        <Subdiv>
          <div className="info">
            <Text size="50px" weight="700">
              LOVE YOUR HUNGER
            </Text>
            <Text size="25px" weight="100">
              Wanna eat? Grab your grub from your favourite canteen.
            </Text>
            <Inputdiv>
              <input
                placeholder="Search College"
                className="input"
                onChange={(e) => findCollege(e.target.value)}
                value={college}
              />
              {college ? (
                <div className="dropdown">
                  <Text
                    size="20px"
                    weight="200"
                    onClick={(e) => findCollege(e.target.innerHTML)}
                  >
                    {colleges.find((item) => {
                      return Object.values(item)
                        .join("")
                        .toLowerCase()
                        .includes(college.toLowerCase());
                    })}
                  </Text>
                </div>
              ) : (
                ""
              )}
              <div className="button" onClick={() => {}}>
                Go
              </div>
              {/* <Button>GO</Button> */}
            </Inputdiv>
          </div>
          <img className="bgimg" src={bgimg} />
        </Subdiv>
        <About>
          <Text color="#FE724D" size="30px" weight="600">
            ABOUT
          </Text>
          <Text color="black" size="25px">
            Now the food walks to you
          </Text>
        </About>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Homepage;
