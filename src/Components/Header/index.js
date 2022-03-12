import { useState } from "react";
import styled from "styled-components";
import Logo from "../../Images/Logo.svg";
import { Button, Text } from "../ExportStyles";
import LoginCard from "../Login";

const Wrapper = styled.div`
  display: flex;
  padding: 30px 65px;
  justify-content: space-between;
  background: white;
  align-items: center;
  position: relative;
  
  .Logo {
    width: 180px;
    object-fit: contain;
  }

  .Buttondiv {
    display: flex;
    gap: 40px;
  }
`;

const Header = ({ college }) => {
  const [loginClicked, toggleLogin] = useState(false);
  const [signUpClicked, toggleSignup] = useState(false);

  return (
    <Wrapper>
      <img className="Logo" src={Logo} />
      {college && (
        <Text size="20px" weight="300">
          {college}
        </Text>
      )}
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
      <LoginCard
        loginClicked={loginClicked}
        signUpClicked={signUpClicked}
        toggleLogin={toggleLogin}
        toggleSignup={toggleSignup}
      />
    </Wrapper>
  );
};

export default Header;
