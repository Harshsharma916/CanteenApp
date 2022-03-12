import styled from "styled-components";
import Logo from "../../Images/Logo.svg";
import { Button,Text } from "../ExportStyles";

const Wrapper = styled.div`
  display: flex;
  padding: 30px 65px;
  justify-content: space-between;
  background: white;
  align-items: center;
  
  .Logo {
    width: 180px;
    object-fit: contain;
  }

  .Buttondiv{
    display: flex;
    gap: 40px;
  }
`;

const Header = ({toggleLogin ,toggleSignup,college}) => {
  return (
    <Wrapper>
      <img className="Logo" src={Logo} />
      {college && <Text size="20px" weight="300">{college}</Text>}
      <div className="Buttondiv">
        <Button color="black" onClick={() => toggleLogin((prevState) => {return !prevState})}>Login</Button>
        <Button bg="#FE724D" color="white" onClick={() => toggleSignup((prevState) => {return !prevState})}>Sign up</Button>
      </div>
    </Wrapper>
  );
};

export default Header;
