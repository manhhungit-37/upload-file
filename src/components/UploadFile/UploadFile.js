import React, { forwardRef, memo, useCallback, useState } from 'react';
import CameraSVG from '../assets/svg/import.svg'
import styles from './UploadFile.module.scss';


function UploadFile({ value, onChange }, ref) {
  const [images, setImages] = useState([]);

  const onChooseFile = useCallback((e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImages(prevState => [...prevState, url]);
    onChange([...value, file]);
  }, [onChange, value]);

  return (
    <div ref={ref}>
      <div className={styles.container}>
        <div className={styles.image_wrapper}>
          {images.length > 0 && images.map((image, index) => (
            <img key={index} src={image} alt="Avatar" className={styles.avatar} />
          ))}
        </div>
        <div className={styles.camera}>
          <input type="file" id="avatar" name="avatar" className={styles.none} onChange={onChooseFile} />
          <label htmlFor="avatar" className={styles.label}>
            <img src={CameraSVG} alt="Import" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default memo(forwardRef(UploadFile));