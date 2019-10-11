import React, { FC, ReactElement } from 'react';
import { connect, DispatchProp } from 'react-redux';

import { FetchPersonType } from '../../fetches/reqresApi';
import useTranslator from '../../hooks/useTranslator';
import { Reducers } from '../../redux/reducers';

import './UserBadge.scss';


interface MapStateToPropsType {
  person?: FetchPersonType;
}

type UserBadgeProps = DispatchProp & MapStateToPropsType;


const UserBadge: FC<UserBadgeProps> = ({ person }): ReactElement => {
  const translate = useTranslator();

  return (
    <section className="user-badge">
      {person ? (
        <>
          <img
            src={person.avatar}
            alt={`${person.first_name} ${person.last_name}`}
            className="user-badge__avatar"
          />
          <p className="user-badge__nametag">
            <span>{`${person.first_name} ${person.last_name}`}</span>
            <br />
            <span>{person.email}</span>
          </p>
        </>
      ) : (
        <>
          <img
            src="//placehold.it/25x25"
            alt="Guest"
            className="user-badge__avatar"
          />
          <div className="user-badge__nametag">
            <p>
              {translate(['user', 'guest'])}
            </p>
          </div>
        </>
      )}
    </section>
  );
};


const mapStateToProps = (state: Reducers): MapStateToPropsType => ({
  person: state.appReducer.person,
});

export default connect(mapStateToProps)(UserBadge);
