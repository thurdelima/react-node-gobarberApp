import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';
import logo from '~/assets/logo_purple.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  //console.log('PROFILE: ', profile);
  let url ='';

  if(profile.avatar !== null){
    url = profile.avatar.url
  }else{
    url = 'https://api.adorable.io/avatars/50/abott@adorable.png';
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                url

              }
              alt="thur"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
