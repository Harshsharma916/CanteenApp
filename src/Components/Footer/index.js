import styled from "styled-components";
import { Text } from "../ExportStyles";

const Wrapper = styled.div`
  display: flex;
  // gap: 20px;
  justify-content: space-between;
  padding: 100px 5%;
`;

const ContactInfo = styled.div`
  display: flex;
  width: 60%;
  gap: 50px;
  padding-right: 50px;

  .subdiv {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 20px;
  }
`;
const Formdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  width: 40%;

  .S-input {
    padding: 10px;
    border: 1px black solid;
  }
  .L-input {
    padding: 10px;
    height: 100px;
    border: 1px black solid;
  }
`;

const info = [
  {
    name: "EMAIL",
    value: "harsh@ar.iitr.ac.in",
  },
  {
    name: "PHONE",
    value: "Akshit: 263273673",
  },
  {
    name: "OUR ADDRESS",
    value: "Jawahar Bhawan IIT Roorkee Roorkee ,Uttarakhand - 247667",
  },
];

const formquery = [
  {
    id: 0,
    name: "Name",
  },
  {
    id: 1,
    name: "Email",
  },
  {
    id: 2,
    name: "Contact number",
  },
  {
    id: 3,
    name: "Write Your Message",
  },
];

const Footer = () => {
  return (
    <Wrapper>
      <ContactInfo>
        {info.map((item, key) => {
          return (
            <div className="subdiv" key={key}>
              <Text color="black" size="22px">
                {item.name}
              </Text>
              <Text color="black" size="18px" weight="100">
                {item.value}
              </Text>
            </div>
          );
        })}
      </ContactInfo>
      <Formdiv>
        {formquery.map((item, key) => {
          return item.id == 3 ? (
            <input className="L-input" placeholder={item.name} />
          ) : (
            <input className="S-input" placeholder={item.name} />
          );
        })}
      </Formdiv>
    </Wrapper>
  );
};

export default Footer;
