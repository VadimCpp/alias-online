import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/constainer";
import Header from "../../components/header";
import UserContext from "../../contexts/userContext";
import Avatar from "../../components/avatar";

const Profile = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "80px";
  const FOOTER_HEIGHT = "50px";

  let { uid } = useParams();

  const { lang, user, users } = useContext(UserContext);
  
  const [ profileUid, setProfileUid ] = useState(null);
  const [ profileUser, setProfileUser ] = useState(null);
  useEffect(() => setProfileUid(uid || user?.uid), [uid, user]);
  useEffect(() => setProfileUser(users?.find(u => profileUid === u.uid)), [profileUid, users]);
  
  console.log(profileUser);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <Header
          title={lang("profile")}
          backButton
          menuButton
        />
      </Container.Header>
      <Container.Content>
        <ProfileContent>
          { profileUser && (
            <>
              <AvatarWrap>
                <Avatar user={profileUser} big={true} />
              </AvatarWrap>
              <SectionTitle>
                { profileUser.displayName }
              </SectionTitle>
              { profileUser.pro && profileUser.instagram && (
                <>
                  <p>
                    {lang("this_is_pro")}
                  </p>
                  <p>
                    <a href={profileUser.instagram}>Instagram</a>
                  </p>
                </>
              )}
            </>
          )}
        </ProfileContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <ProfileFooter>
          { lang("it_is_your_profile") }
        </ProfileFooter>
      </Container.Footer>
    </Container>
  );
};

const ProfileContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

const AvatarWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SectionTitle = styled.h2`
  padding-top: 15px;
  padding-bottom: 10px;
  font-size: 24px;
  text-align: center;
`
export default Profile;
