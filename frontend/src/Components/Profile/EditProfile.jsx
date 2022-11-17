import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea
} from 'mdb-react-ui-kit';
import { updateUser } from '../../services/user.service';
import { uploadImage } from '../../services/image.service';
import { MESSAGE } from '../../actions/messages';
import { getErrorMessage } from '../../utils/utils';

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user.name);
  const [city, setCity] = useState(user.city);
  const [aboutme, setAboutme] = useState(user.aboutme);
  const [phone, setPhone] = useState(user.phone);
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsSelected] = useState(false);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    return uploadImage(event.target.files[0])
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          // return `${API_URL}image/${response.data.key}`;
        } else {
          throw new Error('Status not 200');
        }
      })
      .catch((error) => {
        dispatch(MESSAGE.error(getErrorMessage(error)));
        return 'Error uploading image';
      });
  };
  const handleSubmit = () => {
    updateUser(user._id, name, aboutme, city, phone, '')
      .then((response) => {
        if (response.status === 200) {
          dispatch(MESSAGE.success(response.data));
          // window.location.reload();
        } else if (response.status === 400) {
          dispatch(MESSAGE.info(response.data));
        } else {
          throw new Error('Status code not 200');
        }
      })
      .catch((error) => {
        dispatch(MESSAGE.error(getErrorMessage(error)));
      });
  };

  return (
    <MDBContainer fluid className="py-5 h-100">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol md="8">
          <MDBCard className="my-2  align-items-center p-5">
            <h2 id="headerTitle">Edit Profile</h2>

            <MDBRow className="g-0">
              <MDBCol md="4" className="justify-content-center align-items-center p-2">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  alt="Sample photo"
                  className="mt-4 mb-2 img-thumbnail"
                  style={{
                    width: '250px',
                    height: '250px',
                    zIndex: '1',
                    alignSelf: 'center'
                  }}
                />
                <center>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    onChange={handleImage}
                  />

                  <MDBBtn
                    outline
                    active
                    color="dark"
                    style={{
                      height: '36px',
                      overflow: 'visible',
                      width: '150px',
                      marginTop: '10px',
                      zIndex: '1'
                    }}
                    onClick={handleClick}
                  >
                    Select
                  </MDBBtn>
                </center>
              </MDBCol>

              <MDBCol>
                <MDBCardBody className="text-black d-flex flex-column justify-content-center align-items-center">
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        readOnly
                        wrapperClass="mb-4"
                        label="Username"
                        size="sm"
                        id="form1"
                        type="text"
                        value={user.username}
                        style={{ color: 'gray' }}
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBInput
                        readOnly
                        wrapperClass="mb-4"
                        label="Email"
                        size="sm"
                        id="form1"
                        type="text"
                        value={user.email}
                        style={{ color: 'gray' }}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    size="lg"
                    id="form3"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <MDBTextArea
                    wrapperClass="mb-4"
                    label="About Me"
                    size="lg"
                    id="form5"
                    type="textarea"
                    rows={2}
                    id="textarea"
                    value={aboutme}
                    onChange={(e) => setAboutme(e.target.value)}
                    style={{
                      borderTop: '0',
                      borderLeft: '0',
                      borderRight: '0',
                      borderBottom: '1',
                      outline: 'none'
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="City"
                    size="lg"
                    id="form4"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phone"
                    size="lg"
                    id="form6"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn
                      outline
                      active
                      color="dark"
                      style={{
                        height: '36px',
                        overflow: 'visible',
                        width: '150px',
                        marginTop: '10px',
                        zIndex: '1'
                      }}
                    >
                      Reset
                    </MDBBtn>
                    <MDBBtn
                      className="ms-2"
                      outline
                      active
                      color="dark"
                      style={{
                        height: '36px',
                        overflow: 'visible',
                        width: '150px',
                        marginTop: '10px',
                        zIndex: '1'
                      }}
                      onClick={handleSubmit}>
                      Submit
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default EditProfile;
