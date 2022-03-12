import { useSelector } from "react-redux";
import styled from "styled-components";
import { Wrapper, Text } from "../../Components/ExportStyles";
import Card from "../../Components/FoodCard";
import Header from "../../Components/Header";
import Menucard from "../../Components/Menucard";
import { Toppickdiv } from "../Canteenlist";

const Recommendationdiv = styled(Toppickdiv)``;

const Menu = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;

  .categories {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    margin-right: 100px;
  }

  .foodlist {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 20px;
    row-gap: 20px;
  }
`;

const Canteenmenu = () => {
  const selectedCanteen = useSelector((state) => state.selectedCanteen);
  const categories = ["Patties", "Rolls", "Parathas"];

  return (
    <>
      <Header college={selectedCanteen.college.name} />
      <Wrapper>
        <Text
          size="36px"
          weight="500"
          style={{ marginTop: "40px", textAlign: "left" }}
        >
          {selectedCanteen.name.toUpperCase()}
        </Text>
        <Toppickdiv>
          <div className="toppick-header">
            <Text size="24px" weight="500">
              Top picks
            </Text>
          </div>
          <div className="img-div">
            {selectedCanteen.menu.map((item, key) => {
              return <Card key={key} data={item} />;
            })}
          </div>
        </Toppickdiv>
        <Recommendationdiv>
          <div className="toppick-header">
            <Text size="24px" weight="500">
              Recommendations
            </Text>
          </div>
          <div className="img-div">
            {selectedCanteen.menu.map((item, key) => {
              return <Card key={key} data={item} />;
            })}
          </div>
        </Recommendationdiv>

        <Text
          size="24px"
          weight="500"
          style={{ marginTop: "50px", textAlign: "left" }}
        >
          MENU
        </Text>
        <Menu>
          <div className="categories">
            {categories.map((item, key) => {
              return <Text size="20px">{item}</Text>;
            })}
          </div>
          <div className="foodlist">
            {selectedCanteen.menu.map((item, key) => {
              return <Menucard key={key} data={item} />;
            })}
          </div>
        </Menu>
      </Wrapper>
    </>
  );
};

export default Canteenmenu;
