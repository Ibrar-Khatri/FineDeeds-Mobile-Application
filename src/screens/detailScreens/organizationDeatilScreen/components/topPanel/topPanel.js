import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
  normalize,
} from '../../../../../responsive/responsive';
import {
  CustomButton,
  RenderS3Image,
} from '../../../../../components/common/common';
import Location from './location/location';

export default function TopPanel(props) {
  const {org, user} = props;

  return (
    <DropShadow style={style.dropShadow}>
      <View style={style.headerViewInsideDropShadow}>
        <RenderS3Image
          resizeMode="cover"
          s3Key={org && `ORGANIZATION/IMAGE/${org?.orgId}.webp`}
          style={style.orgImage}>
          {user?.role === 'STAFF' ? null : (
            <View style={style.orgButtonView}>
              <CustomButton
                // onClick={
                //   !user
                //     ? () => toast.warn('please Signin to join organization')
                //     : org?.checkOrgJoinStatus?.status === 'NO_REQUEST'
                //     ? () => joinOrg()
                //     : org?.checkOrgJoinStatus?.status === 'ACCEPTED'
                //     ? () => setModal(!modal)
                //     : () => {}
                // }
                // loader={loading}
                // disabled={
                //   org?.checkOrgJoinStatus?.status === 'PENDING' ||
                //   org?.checkOrgJoinStatus?.status === 'DECLINED'
                // }

                buttonText={
                  !user
                    ? 'Join'
                    : org?.checkOrgJoinStatus?.status === 'NO_REQUEST'
                    ? 'Join'
                    : org?.checkOrgJoinStatus?.status === 'PENDING'
                    ? 'Request Pending'
                    : org?.checkOrgJoinStatus?.status === 'DECLINED'
                    ? 'Request Declined'
                    : 'UnJoin'
                }
              />
            </View>
          )}
        </RenderS3Image>
        <Location orgId={org?.orgId} />
      </View>
    </DropShadow>
  );
}

let style = StyleSheet.create({
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  orgImage: {
    height: vw(50),
    width: '100%',
  },
  dropShadow: {
    margin: vw(3),
    shadowColor: '#818181',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  headerViewInsideDropShadow: {
    padding: vw(3),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  orgButtonView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: vw(35),
    paddingRight: vw(3),
    width: vw(25),
  },
});
