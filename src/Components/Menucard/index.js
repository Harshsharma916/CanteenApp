import styled from "styled-components";
import Counter from "../Counter";
import { Text } from "../ExportStyles";

const Carddiv = styled.div`
    display: flex;
    padding: 10px;
    width: 400px;
    position: relative;

    .img{
        width: 200px;
    }

    .text-div{
        display:flex;
        flex-direction:column;
    }

    .order-div{
        display: flex;
        flex-direction:column;
    }
`
const Menucard = ({data}) =>{
    return(
        <Carddiv>
            <img src={data.imgSrc} className="img"/>
            <div className="text-div">
                <Text size="20px" weight="400">{data.name}</Text>
                <Text size="12px" weight="200">{data.info}</Text>
                <Text size="22px" weight="400">₹{data.price}</Text>
            </div>
            <div className="order-div">
                <Counter style={{right:"0px"}}/>
            </div>
        </Carddiv>
    )

}

export default Menucard;