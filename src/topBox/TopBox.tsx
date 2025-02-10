import { useDataProvider } from "react-admin";
import { useEffect, useState } from "react";
import "./topBox.scss"


type Props = {
  title: string;
  title_box1: string;
  dataKey: string;
  count: number;
  allUsers: any[];
  allGroups:any[];
};

const defaultPhoto = "photos/undefined.jpg"

const TopBox = (props: Props) => {
  //Перевірка чи існує фотографія у папці
  function fileExists(url: string) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
  }
  const userNameOrComputerName = props.allUsers
  ? props.allUsers
  : props.allGroups;
  return (
    <div className="topBox">
      <h1>{props.title || props.title_box1}</h1>
      <div className="list">
        {userNameOrComputerName.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.photo && fileExists(user.photo) ? user.photo : defaultPhoto} alt="" />
              <div className="userTexts">
                <span className="username">{user.username || user.groupName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <div className="userTexts">
            <span className="room">{user.officeName ? 'каб:'+ user.officeName : ''}</span>
            <span className="phone">{user.telephoneNumber ? 'тел:'+ user.telephoneNumber : ''}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox