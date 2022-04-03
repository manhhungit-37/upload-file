import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import UploadFile from './UploadFile';

const UPLOAD_FILE_URL = 'UPLOAD_FILE_URL';

function UploadFileIndex() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      picture: [],
    }
  });

  const uploadAvatar = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return await fetch(UPLOAD_FILE_URL, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  }, []);

  function onSubmit(values) {
    uploadAvatar(values.avatar);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller 
        control={control}
        name="picture"
        render={({ field }) => (
          <UploadFile {...field} />
        )}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default UploadFileIndex;