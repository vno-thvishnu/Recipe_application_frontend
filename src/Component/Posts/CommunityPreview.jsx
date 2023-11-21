import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UseContext';
import { useContext } from 'react';

function CommunityPreview({get, previewModal, setPreviewModal }) {

  const { loginUser} = useContext(UserContext)
  const theme = useMantineTheme();

  return (
    <Modal
    overlayColor={
     theme.colorScheme === "dark"
       ? theme.colors.dark[9]
       : theme.colors.gray[2]
   }
         overlayOpacity={0.55}
         overlayBlur={3}
         size="80%"
         opened={previewModal}
         onClose={() => {setPreviewModal(false)}}
       >
      <form className="inputform bpad">
      <div className="inputtop">
      <h3>{get.title}</h3>
      <Link to={loginUser._id===get.userId?`/home/profile`:`/home/view/${get.userId}`} className='edit _link'>View Profile</Link>
      </div>
      <div className="Inputpair">
          <textarea
           rows="20" 
            className="Input inplg"
            type="text"
            placeholder="Ingredients & Recipe"
            name="recipe"
            value={get.recipe}
          /></div>

</form>

       </Modal>
  )
}

export default CommunityPreview