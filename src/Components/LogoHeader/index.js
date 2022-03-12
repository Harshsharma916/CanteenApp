import styled from "styled-components";
import { Button } from "../ExportStyles";
import { Text } from "../ExportStyles";
import Logo from "../../Images/logo.jpg";
import User from "../../Images/User.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  padding: 0px 40px;
  background: white;
  align-items: center;
  justify-content: space-between;

  .Logoimg {
    width: 150px;
  }

  .Logindiv {
    display: flex;
    gap: 30px;
  }

  .Userimg {
    width: auto;
    height: 42px;
  }
`;

const LogoHeader = ({showLoginButton,showLogoutButton,userName}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Div>
      <img src={Logo} className="Logoimg" />
      <Text family="Dancing Script" size="40px" weight="100">
        Welcome {userName} ;)
      </Text>
      <div className="Logindiv">
        {showLoginButton && <Button>login</Button>}
        {showLogoutButton && <Button onClick={() => dispatch({type:'logout'},navigate('/'))}>logout</Button>}
        <img src={User} className="Userimg" />
      </div>
    </Div>
  );
};

export default LogoHeader;
