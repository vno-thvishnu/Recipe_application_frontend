import React from "react";
import { useState } from "react";
import CommunityPreview from "./CommunityPreview";


function CommunityCard({ get }) {

    const [previewModal, setPreviewModal] = useState(false);
const [id, setId] = useState("");

// console.log(get)
  return (
    <>
      {/* <div className="cardbg"> */}
        {get.length === 0 ? (
          <>
            <h2>No posts</h2>
          </>
        ) : (
          <>
            <div
              className="card cardtwo"
              onClick={() => {
                setId(get._id);
                setPreviewModal(true);
              }}
            >
              <img src={get.recipeImage} />
              <div className="float floattwo">
              <div>
                <img src={get.profileImage}/>
              <p>{get.userName}</p>
              </div>
                <p>{get.title}</p>
              </div>

              {get._id === id ? (
                <>
                  <CommunityPreview
                    get={get}
                    previewModal={previewModal}
                    setPreviewModal={setPreviewModal}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      {/* </div> */}
    </>
  );
}

export default CommunityCard;
