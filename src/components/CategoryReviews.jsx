import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";
import {Link} from "react-router-dom";

const CategoryReviews = ({handleClickCategory}) => {
  const [categories, setCategories] = useState([]);
  const categoriesCollectionRef = collection(db, 'categories');
  const q = query(categoriesCollectionRef, orderBy('categoryname', 'asc'));

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(q);
      setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getCategories();
  }, []);

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Row style={{width: '100%'}}>
        <Col className='d-flex flex-row justify-content-between' style={{width: '100%'}}>
          {categories.map((category, key) => {
            const categoryName = category.categoryname;
            return (
              <div key={key} style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => handleClickCategory(category.categoryname)}>{category.categoryname}</div>
            );
          })
          }
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryReviews;