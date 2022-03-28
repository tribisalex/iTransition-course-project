import React, {useEffect, useState} from 'react';
import {Card, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, deleteCategory, editCategory, setCategories, sortCategory} from "../store/state/category/actions";
import {addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import Table from "react-bootstrap/Table";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const categories = useSelector(state => state.category.categories)
  const sortBy = useSelector(state => state.category.sortBy)
  const sortOrder = useSelector(state => state.category.sortOrder)
  const categoriesCollectionRef = collection(db, "categories");
  const q = query(categoriesCollectionRef, orderBy(sortBy, sortOrder));

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(q);
      dispatch(setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getCategories();
  }, [sortBy, sortOrder]);

  const handleAddCategory = async () => {
    const category = await addDoc(categoriesCollectionRef, {
      categoryname: categoryName,
    });
    dispatch(addCategory({id: category.id, categoryname: categoryName}));
    setCategoryName('')
  };

  const handleDeleteCategory = async (id) => {
    const categoryDoc = doc(db, 'categories', id);
    await deleteDoc(categoryDoc);
    dispatch(deleteCategory(id));
  };

  const handleSortBy = (newSortBy) => {
    if (sortBy === newSortBy) {
      dispatch(sortCategory(sortBy, sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(sortCategory(newSortBy, 'asc'));
    }
  }

  const handleEditCategory = async (id, text) => {
    const categoryDoc = doc(db, 'categories', id);
    await updateDoc(categoryDoc, {
      categoryname: text
    });
    dispatch(editCategory(id, text));
    setCategoryName('');
    setCategoryId('')
  };

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'
               style={{height: window.innerHeight - 130}}>
      <Row><h1>Categories</h1></Row>
      <Card>
        <Form className='d-flex justify-content-center align-items-center'>
          <FloatingLabel controlId="floatingInput" className='m-2' label="Name category">
            <Form.Control
              placeholder='Name category'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </FloatingLabel>
          <Button variant={"outline-primary"}
                  className='m-2'
                  onClick={categoryId
                    ? () => handleEditCategory(categoryId, categoryName)
                    : handleAddCategory}>
            {categoryId
              ? 'Edit category'
              : 'Add category'
            }
          </Button>
        </Form>
      </Card>
      <Row style={{width: '60%'}}>
        <Table responsive="md" hover style={{textAlign: 'center'}}>
          <thead>
          <tr>
            <th>id</th>
            <th style={{cursor: 'pointer'}}
                onClick={() => handleSortBy('categoryname')}>Name</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          </thead>
          <tbody>
          {categories.map((category, key) =>
            <tr>
              <td>{category.id}</td>
              <td>{category.categoryname}</td>
              <td onClick={() => handleDeleteCategory(category.id)}
                  style={{cursor: 'pointer'}}>Delete</td>
              <td onClick={() => {
                setCategoryId(category.id);
                setCategoryName(category.categoryname);
              }}
                  style={{cursor: 'pointer'}}>Edit
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default CategoriesPage;