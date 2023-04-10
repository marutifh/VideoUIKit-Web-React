import React, { FC } from 'react';
import * as ReactDOM from "react-dom/client"
import reactToWebComponent from 'react-to-webcomponent';
import AgoraUIKit, { layout, RtcPropsInterface, RtmPropsInterface } from 'agora-react-uikit';
  
// cannot extend from RTM simultaneously as token and uid are rewritten
interface Props extends RtcPropsInterface {
  rtmToken: RtmPropsInterface['token']
  rtmUid: RtmPropsInterface['uid']
  username: RtmPropsInterface['username']
  showPopUpBeforeRemoteMute: RtmPropsInterface['showPopUpBeforeRemoteMute']
  displayUsername: RtmPropsInterface['displayUsername']
}

const App: FC<Props> = (props) => {

  const handleEndCallClick = () => {
    const event = new Event('agoraUIKitEndcall');
    dispatchEvent(event);
  };

  const handleUserJoinedEvent = () => {
    try {
      const event = new Event('agoraUserJoinedCall');
      dispatchEvent(event);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AgoraUIKit
      rtcProps={{
        appId: props.appId,
        channel: props.channel,
        uid: props.uid,
        token: props.token,
        tokenUrl: props.tokenUrl,
        activeSpeaker: props.activeSpeaker,
        callActive: props.callActive,
        enableDualStream: props.enableDualStream,
        dualStreamMode: props.dualStreamMode,
        layout: props.layout,
        role: props.role,
        disableRtm: props.disableRtm,
        enableAudio: props.enableAudio,
        enableVideo: props.enableVideo
      }}
      rtmProps={{
        username: props.username,
        token: props.rtmToken,
        uid: props.rtmUid,
        showPopUpBeforeRemoteMute: props.showPopUpBeforeRemoteMute,
        displayUsername: props.displayUsername,
      }}
      callbacks={{
        EndCall: () => {
          console.log('end call is clicked');
          handleEndCallClick();
        },
        'user-joined': () => {
          console.log('user-joined event');
          handleUserJoinedEvent();
        },
      }} />
  );
};

App.defaultProps = {
  appId: '',
  disableRtm: false,
  channel: 'test',
  uid: 0,
  token: null,
  tokenUrl: undefined,
  activeSpeaker: false,
  callActive: true,
  enableDualStream: false,
  dualStreamMode: undefined,
  layout: layout.grid,
  role: 'host',
  enableVideo: true,
  enableAudio: true,
  username: 'user',
  rtmToken: undefined,
  showPopUpBeforeRemoteMute: true,
  displayUsername: false,
}

const wcChecklist = reactToWebComponent(App, React, ReactDOM, { dashStyleAttributes: true });

customElements.define("agora-react-web-uikit", wcChecklist);