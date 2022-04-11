import {categories} from '../data';
import styled from "styled-components"
import CategoryItem from './CategoryItem';
import { tablet } from '../responsive';


const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${tablet({ flexDirection: "column" })}
`

const Categories = () => {
  return (
    <Container>
      {categories.map(item => (
          <CategoryItem key={item.id} item={item}/>
      ))}
    </Container>
  );
}

export default Categories;
