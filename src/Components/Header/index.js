import { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../Images/Logo.svg";
import { Button, Text } from "../ExportStyles";
import LoginCard from "../Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user from "../../Images/user.png";
const Wrapper = styled.div`
  display: flex;
  padding: 30px 5%;
  justify-content: space-between;
  background: white;
  align-items: center;
  position: relative;

  .Logo {
    width: 180px;
    object-fit: contain;
    :hover {
      cursor: pointer;
    }
  }

  .Buttondiv {
    display: flex;
    gap: 40px;
  }

  .userImg {
    width: 60px;
    position: relative;
    :hover{
      cursor:pointer;
    }

  }
  
  .logouttext {
    position: absolute;
    top: 60px;
    right: 150px;
    z-index: 2;
  }
`;

const Header = ({ college, show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginClicked, toggleLogin] = useState(false);
  const [signUpClicked, toggleSignup] = useState(false);
  const loginData = useSelector((state) => state.loginData);
  const [showLogout, setLogout] = useState(false);

  useEffect(() => {
    if (show) {
      toggleLogin(true);
    }
  }, [show]);

  function clearFunc() {
    dispatch({ type: "clear" });
    navigate("/");
  }

  return (
    <Wrapper>
      <img className="Logo" src={Logo} onClick={() => navigate('/')} />
      {showLogout && <Button className="logouttext" color="black" bg="white" onClick={() => clearFunc()}>Logout</Button>}
      {college && (
        <Text size="20px" weight="300">
          {college}
        </Text>
      )}
      {loginData?.name ? (
        <img
          src={user}
          className="userImg"
          onClick={() => setLogout((prev) => !prev)}
        />
      ) : (
        <>
          <div className="Buttondiv">
            <Button
              color="black"
              onClick={() =>
                toggleLogin((prevState) => {
                  return !prevState;
                })
              }
            >
              Login
            </Button>
            <Button
              bg="#FE724D"
              color="white"
              onClick={() =>
                toggleSignup((prevState) => {
                  return !prevState;
                })
              }
            >
              Sign up
            </Button>
          </div>
        </>
      )}
      {loginData?.name ? (
        ""
      ) : (
        <LoginCard
          loginClicked={loginClicked}
          signUpClicked={signUpClicked}
          toggleLogin={toggleLogin}
          toggleSignup={toggleSignup}
        />
      )}
    </Wrapper>
  );
};

export default Header;
