import React, {useEffect, useState} from 'react';
import {Card, Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getAuth} from "firebase/auth";
import {MYPAGE_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {db} from '../firebase';
import {addDoc, collection, getDocs, orderBy, query, serverTimestamp} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { Radio, RadioGroup} from 'react-radio-group';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddReviewPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [drag, setDrag] = useState(false);
  const [tags, setTag] = useState('');
  const [image, setImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [categories, setCategories] = useState([]);
  const [isUploading, setUploading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const reviewsCollectionRef = collection(db, "reviews");
  const categoriesCollectionRef = collection(db, 'categories');
  const q = query(categoriesCollectionRef, orderBy('categoryname', 'asc'));

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(q);
      setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getCategories();
  }, []);

  const addReview = async () => {
    await addDoc(reviewsCollectionRef, {
      userid: user.uid,
      reviewname: name,
      tags: tags,
      imageurl: downloadUrl,
      category: category,
      reviewtext: reviewText,
      rating: Number(rating),
      createdAt: serverTimestamp(),
    });
    navigate(MYPAGE_ROUTE)
  };

  const storage = getStorage();
  const metadata = {
    contentType: 'image/jpeg'
  };

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true)
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files]
    setDrag(false);
    setImage(files[0]);
    setUploading(false)
  }

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setUploading(false)
    }
  }

  const handleUpload = () => {
    const storageRef = ref(storage, 'images/' + image.name);
    const uploadImage = uploadBytesResumable(storageRef, image, metadata);
// Listen for state changes, errors, and completion of the upload.
    uploadImage.on('state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setDownloadUrl(downloadURL);
          setImage(null);
          setProgress(0);
          setUploading(true);
        });
      }
    );
  }

  const ratingItems = [1,2,3,4,5]

  return (
    <Container className='mt-2 d-flex flex-column justify-content-center align-items-center'
               style={{width: '100%'}}>
      <h1>Add new review</h1>
      <Card className="p-2" style={{width: '100%'}} lg={12}>
        <Form className='d-flex flex-column justify-content-center'>
          <div className='mb-2 mt-2'>
            {drag
              ? <div className='d-flex align-items-center justify-content-center'
                     style={{height: '15vh', border: '1px dashed black'}}
                     onDragStart={e => dragStartHandler(e)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDragOver={e => dragStartHandler(e)}
                     onDrop={e => onDropHandler(e)}
              >Release the files to download them</div>
              : <div className='d-flex align-items-center justify-content-center'
                     style={{height: '15vh', border: '1px solid grey'}}
                     onDragStart={e => dragStartHandler(e)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDragOver={e => dragStartHandler(e)}
              >
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <label htmlFor="file-input" style={{fontWeight: 'bold', cursor: 'pointer'}}>Select a file</label>
                  <span>or drag it here to upload them</span>
                  <input type='file'
                         onChange={handleChange}
                         id="file-input"
                         style={{width: 0.1, height: 0.1, opacity: 0, position: 'absolute', zIndex: -10}}
                  />
                  <div className='d-flex align-items-center justify-content-center'>
                    {
                      (progress !== 100 && progress !== 0) && < progress value={progress} max='100'/>
                    }
                    {
                      (progress === 100) && <div>Upload completed</div>
                    }
                    <Button disabled={isUploading} className='m-2 p-1' onClick={handleUpload}>Upload</Button>
                  </div>
                </div>
              </div>
            }
          </div>

          <FloatingLabel controlId="floatingInput" label="Name review">
            <Form.Control
              placeholder='Name review'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <Form.Select className='mt-2'
                       aria-label="Default select example"
                       value={category}
                       onChange={(e) => setCategory(e.target.value)}>
            <option selected>Select the category</option>
            {categories.map((category, key) => {
              return (
                <option key={key} value={category.categoryname}>{category.categoryname}</option>
              )
            })}
          </Form.Select>

          <FloatingLabel controlId="floatingInput2" label="Tags" className="mb-2">
            <Form.Control
              className='mt-2'
              placeholder='Tags'
              value={tags}
              onChange={e => setTag(e.target.value)}
            />
          </FloatingLabel>

            <div>Author's rating</div>
          <RadioGroup className='d-flex align-items-center' name="Rating" onChange={(e) => setRating(e)} value={rating}>
            {ratingItems.map((ratingItem, key) => {
             return (
               <div key={key} className="m-2 d-flex flex-column align-items-center">
                <Radio value={ratingItem}/>{ratingItem}
              </div>
             )
            })}
          </RadioGroup>

          <FloatingLabel controlId="floatingTextarea" label="Text review" className="mb-2">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{height: '110px'}}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
          </FloatingLabel>

          <Button variant={"outline-primary"} className='mt-2' onClick={addReview}>Add review</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddReviewPage;