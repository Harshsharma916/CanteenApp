import styled from "styled-components";
import Counter from "../Counter";
import { Text,Button } from "../ExportStyles";

const Carddiv = styled.div`
  display: flex;
  padding: 10px;
  width: 410px;
  position: relative;
  //   background: black;
  border-radius: 10px;
  border: 1px black solid;

  .img {
    width: 150px;
    border-radius: 10px;
  }

  .text-div {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0px 10px;
    gap: 8px;
  }

  .order-div {
    display: flex;
    flex-direction: column;
    margin-left: auto;
  }
`;
const Menucard = ({ data, order }) => {
  return (
    <Carddiv>
      <img src={data.image} className="img" />
      <div className="text-div">
        <Text size="18px" weight="200">
          {data.name}
        </Text>
        <Text size="12px" weight="200">
          {data.info}
        </Text>
        <Text size="20px" weight="400">
          ₹{data.price}
        </Text>
      </div>
      <div className="order-div">
        {data.count? <Button color="white" bg="#FE724D" style={{padding: '5px 25px'}}>{data.count}</Button>:<Counter order={order} data={data} />}
      </div>
    </Carddiv>
  );
};

export default Menucard;
