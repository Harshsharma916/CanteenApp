import styled from "styled-components";
import Logo from "../../Images/Logo.svg";
import { Button } from "../ExportStyles";

const Wrapper = styled.div`
  display: flex;
  padding: 30px 65px;
  justify-content: space-between;
  background: white;

  .Logo {
    width: 180px;
    object-fit: contain;
  }

  .Buttondiv{
    display: flex;
    gap: 40px;
  }
`;

const Header = ({toggleLogin ,toggleSignup}) => {
  return (
    <Wrapper>
      <img className="Logo" src={Logo} />
      <div className="Buttondiv">
        <Button color="black" onClick={() => toggleLogin((prevState) => {return !prevState})}>Login</Button>
        <Button bg="#FE724D" color="white" onClick={() => toggleSignup((prevState) => {return !prevState})}>Sign up</Button>
      </div>
    </Wrapper>
  );
};

export default Header;
