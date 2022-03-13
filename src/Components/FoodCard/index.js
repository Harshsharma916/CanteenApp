import styled from "styled-components";
import Counter from "../Counter";
import { Button, Text } from "../ExportStyles";
import fooditem from "../../Images/fooditem.svg";

const Carddiv = styled.div`
  position: relative;
  width: 350px;
  height: 200px;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  // background: rgba(0,0,0,0.2);
  border-radius: 10px;
  // padding: 10px;

  .div {
    position: absolute;
    z-index:1;
    width: 350px;
    height: 200px;
    border-radius: 10px;
    background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1));
  }

  .add {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }

  .text-price {
    display: flex;
    position: absolute;
    left: 15px;
    bottom: 8px;
    width: 90%;
    z-index: 2;
    justify-content: space-between;
  }
`;

const Card = ({ data, order }) => {
  return (
    <Carddiv bg={data.image}>
      <div className="div" />
      {/* {add ? (
        <Counter/>
      ) : (
        <Button className="add" bg="#FE724D" onClick={() => setAdd(data.id)}>
          + Add
        </Button>
      )} */}
      <Counter data={data} order={order} />
      <div className="text-price">
        <Text color="white" size="22px" weight="400">
          {data?.name}
        </Text>
        <Text color="white" size="20px" weight="300">
          ₹{data?.price}/-
        </Text>
      </div>
    </Carddiv>
  );
};

export default Card;
