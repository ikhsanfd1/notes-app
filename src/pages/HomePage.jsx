import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesBody from '../components/body/NotesBody';

const HomePageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  return (
    <NotesBody
      onSearch={changeSearchParams}
      notes={getAllNotes()}
      defaultKeyword={keyword}
    />
  );
};

export default HomePageWrapper;
