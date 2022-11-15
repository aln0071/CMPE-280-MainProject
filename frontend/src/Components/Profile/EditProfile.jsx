import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

function EditProfile() {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <MDBContainer fluid className="py-5 h-100">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol md="8">
          <MDBCard className="my-2  align-items-center p-5">
            <h3 className="mb-5 text-uppercase fw-bold">Edit Profile</h3>

            <MDBRow className="g-0">
              <MDBCol md="4" className="justify-content-center align-items-center p-2">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="mt-4 mb-2 img-thumbnail"
                  style={{
                    width: '250px',
                    height: '250px',
                    zIndex: '1',
                    alignSelf: 'center'
                  }}
                />
                <input type="file" ref={hiddenFileInput} style={{ display: 'none' }} />

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
              </MDBCol>

              <MDBCol>
                <MDBCardBody className="text-black d-flex flex-column justify-content-center align-items-center">
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First Name"
                        size="lg"
                        id="form1"
                        type="text"
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last Name"
                        size="lg"
                        id="form2"
                        type="text"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput wrapperClass="mb-4" label="Birthday" size="lg" id="form3" type="text" />

                  <MDBInput wrapperClass="mb-4" label="Pincode" size="lg" id="form4" type="text" />
                  <MDBInput wrapperClass="mb-4" label="Course" size="lg" id="form5" type="text" />
                  <MDBInput wrapperClass="mb-4" label="Email ID" size="lg" id="form6" type="text" />

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
                      }}>
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
                      }}>
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
