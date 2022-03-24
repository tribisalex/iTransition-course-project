import React, {useEffect, useState} from 'react';
import {Card, Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getAuth} from "firebase/auth";
import {MYPAGE_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {db} from '../firebase';
import {addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {addReview, editReview, setReview, setReviewId} from '../store/state/reviews/actions'
import {useDispatch, useSelector} from "react-redux";
import {setCategories} from "../store/state/category/actions";
import {FormattedMessage} from "react-intl";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {MultiSelect} from "react-multi-select-component";
import {addTag, setTagCount, setTags} from "../store/state/tags/actions";

const AddReviewPage1 = () => {
  const navigate = useNavigate();
  const review = useSelector(state => state.review.review)
  const dispatch = useDispatch();
  const reviewId = useSelector(state => state.review.reviewId);
  const categories = useSelector(state => state.category.categories);
  const tags = useSelector(state => state.tags.tags);
  const [name, setName] = useState('');
  const [drag, setDrag] = useState(false);
  const [tagsInput, setTagInput] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [image, setImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [isUploading, setUploading] = useState(true);
  const [selected, setSelected] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const reviewsCollectionRef = collection(db, "reviews");
  const tagsCollectionRef = collection(db, "tags");
  const categoriesCollectionRef = collection(db, 'categories');
  const q = query(categoriesCollectionRef, orderBy('categoryname', 'asc'));

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(q);
      dispatch(setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getTags = async () => {
      const data = await getDocs(tagsCollectionRef);
      dispatch(setTags(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getTags();
  }, []);

  const handleAddTags = async () => {
    const tag = await addDoc(tagsCollectionRef, {
      label: newTagName,
      value: newTagName,
      count: 0,
    });
    dispatch(addTag({
      id: tag.id,
      label: newTagName,
      value: newTagName,
      count: 0
    }));
    setNewTagName('');
  };

  const handleEditTagAddCount = async (id, count) => {
    const tagDoc = doc(db, "tags", id);
    const newFields = { count: count + 1 };
    await updateDoc(tagDoc, newFields);
    dispatch(setTagCount(id, newFields));
  };

  useEffect(() => {
    const docRef = doc(db, "reviews", reviewId ? reviewId : '1');
    const getReview = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setReview({...docSnap.data()}));
      } else {
        console.log("No such document!");
      }
    }
    getReview();
    if (reviewId) {
      setName(review.reviewname);
      setSelected(review.tags);
      setTagInput(review.tags);
      setCategory(review.category);
      setReviewText(review.reviewtext)
      setRating(review.rating)
      setDownloadUrl(review.imageurl)
    } else {
      setName('');
      setTagInput('');
      setCategory('');
      setReviewText('')
      setRating('')
      setDownloadUrl('')
    }
  }, []);


  const handleAddReview = async () => {
    await addDoc(reviewsCollectionRef, {
      userid: user.uid,
      reviewname: name,
      tags: selected,
      imageurl: downloadUrl,
      category: category,
      reviewtext: reviewText,
      rating: rating,
      createdAt: serverTimestamp(),
    });
    dispatch(addReview({
      userid: user.uid,
      reviewname: name,
      tags: selected,
      imageurl: downloadUrl,
      category: category,
      reviewtext: reviewText,
      rating: rating,
      createdAt: serverTimestamp()
    }));
    selected.map((select) => handleEditTagAddCount(select.id, select.count));
    navigate(MYPAGE_ROUTE);
  };

  const handleEditReview = async (id, name, tags, imageurl, category, reviewText, rating) => {
    const oldSelected = selected;
    const reviewDoc = doc(db, 'reviews', id)
    await updateDoc(reviewDoc, {
      reviewname: name,
      tags: tags,
      imageurl: imageurl,
      category: category,
      reviewtext: reviewText,
      rating: Number(rating),
    });
    dispatch(editReview(id, name, tags, downloadUrl, category, reviewText, rating));
    dispatch(setReviewId(''));
    navigate(MYPAGE_ROUTE)
  }

  const handleCkeditorChange = (e, editor) => {
    const data = editor.getData();
    setReviewText(data);
  }

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

  const ratingItems = [1, 2, 3, 4, 5]


  return (
    <Container className='mt-2 d-flex flex-column justify-content-center align-items-center'
               style={{width: '100%'}}>
      <h1>{reviewId ? <FormattedMessage id='edit_review'/> : <FormattedMessage id='Add_new_review'/>}</h1>
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
              ><FormattedMessage id='release_the_files'/></div>
              : <div className='d-flex align-items-center justify-content-center'
                     style={{height: '15vh', border: '1px solid grey'}}
                     onDragStart={e => dragStartHandler(e)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDragOver={e => dragStartHandler(e)}
              >
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <label htmlFor="file-input" style={{fontWeight: 'bold', cursor: 'pointer'}}><FormattedMessage
                    id='select_a_file'/></label>
                  <span><FormattedMessage id='drag_it'/></span>
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
                      (progress === 100) && <div><FormattedMessage id='upload_completed'/></div>
                    }
                    {
                      downloadUrl
                        ? <img src={downloadUrl} style={{width: 25}}/>
                        : null
                    }
                    <Button disabled={isUploading} className='m-2 p-1' onClick={handleUpload}><FormattedMessage
                      id='upload'/></Button>
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
          <div className='d-flex mt-2 mb-2' style={{width: '100%'}}>
            <FloatingLabel style={{width: '85%'}} controlId="floatingInput" label="New tag">
              <Form.Control
                placeholder='New tag'
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
            </FloatingLabel>
            <Button variant={"outline-primary"}
                    className='m-2'
                    onClick={handleAddTags}>Add tag</Button>
          </div>
          <div>
            <FloatingLabel>Select tags</FloatingLabel>
            <MultiSelect
              options={tags}
              value={selected}
              onChange={setSelected}
              labelledBy="Select tags"
            />
          </div>


          <Form.Select className='mt-2'
                       aria-label="select"
                       value={category}
                       onChange={(e) => setCategory(e.target.value)}>
            <option selected>Select the category</option>
            {categories.map((category, key) => {
              return (
                <option key={key} value={category.categoryname}>{category.categoryname}</option>
              )
            })}
          </Form.Select>

          <Form.Select className='mt-2 mb-2'
                       aria-label="Author's rating"
                       value={rating}
                       onChange={(e) => setRating(e.target.value)}>
            <option selected>Author's rating</option>
            {ratingItems.map((ratingItem, key) => {
              return (
                <option key={key} value={ratingItem}>{ratingItem}</option>
              )
            })}
          </Form.Select>

          <CKEditor
            editor={ClassicEditor}
            onInit={editor => {
            }}
            value={reviewText}
            onChange={handleCkeditorChange}
          />

          <Button variant={"outline-primary"} className='mt-2'
                  onClick={reviewId
                    ? () => handleEditReview(reviewId, name, tagsInput, downloadUrl, category, reviewText, rating)
                    : () => handleAddReview()}>
            {reviewId
              ?<FormattedMessage id='edit_review'/>
              : <FormattedMessage id='add_review'/>}</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddReviewPage1;