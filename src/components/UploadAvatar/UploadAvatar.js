import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultAvatarSVG from '../assets/svg/defaultAvatar.svg'
import CameraSVG from '../assets/svg/import.svg'
import styles from './UploadAvatar.module.scss';

const UPLOAD_FILE_URL = 'UPLOAD_FILE_URL';

function UploadAvatar() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);

  const onChooseFile = useCallback((e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
  }, []);

  const uploadAvatar = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return await fetch(UPLOAD_FILE_URL, {
      method: 'POST',
      body: formData,
    });
  }, []);

  function onSubmit(values) {
    uploadAvatar(values.avatar);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.image_wrapper}>
          <img src={image || DefaultAvatarSVG} alt="Avatar" className={styles.avatar} />
        </div>
        <div className={styles.camera}>
          <input type="file" {...register('avatar')} id="avatar" name="avatar" className={styles.none} onChange={onChooseFile} />
          <label htmlFor="avatar" className={styles.label}>
            <img src={CameraSVG} alt="Import" />
          </label>
        </div>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default UploadAvatar;