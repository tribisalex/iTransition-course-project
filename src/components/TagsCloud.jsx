import React, {useEffect} from 'react';
import {TagCloud} from 'react-tagcloud'
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setTags} from "../store/state/tags/actions";

const TagsCloud = ({handleClickTag}) => {
  const tagsCollectionRef = collection(db, "tags");
  const tags = useSelector(state => state.tags.tags)
  const dispatch = useDispatch();

  const dataTags = [];
  tags.map((tag) => {
    dataTags.push({value: tag.value, count: tag.count})
  })

  useEffect(() => {
    const getTags = async () => {
      const data = await getDocs(tagsCollectionRef);
      dispatch(setTags(data.docs.map((doc) => ({...doc.data(), id: doc.id}))));
    };
    getTags();
  }, []);

  return (
    <TagCloud
      style={{cursor: 'pointer'}}
      minSize={14}
      maxSize={35}
      tags={dataTags}
      onClick={tag => handleClickTag(tag.value)}
    />
  )
}
export default TagsCloud;