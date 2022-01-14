import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'native-base';
import {CardWrapper, RenderS3Image, ResponsiveText} from '../..';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {renderDate} from '../../../shared/services/helper';

export default function RequestCard(props) {
  const {data, acceptRequest, removeRequest, setVolunteerId} = props;

  return (
    <CardWrapper>
      <View style={style.requestCardMainView}>
        <View style={style.imageAndNameView}>
          <RenderS3Image
            s3Key={`VOLUNTEER/${data?.volunteer?.volunteerId}.webp`}
            style={style.profileImageView}
          />
          <View style={style.nameAndEmailView}>
            <ResponsiveText size={13} style={style.volNameText}>
              {data?.volunteer?.volunteerName}
            </ResponsiveText>
            <ResponsiveText style={style.volEmailText} size={12}>
              {data?.volunteer?.email}
            </ResponsiveText>
          </View>
        </View>
        <View style={style.createdAndUpdateView}>
          <View>
            <ResponsiveText size={12} style={style.createdAndUpdateTitle}>
              Requested At
            </ResponsiveText>
            <ResponsiveText size={13} style={style.createdAndUpdateSubTitle}>
              {renderDate(data?.createdAt)}
            </ResponsiveText>
          </View>
          {data?.updatedAt && (
            <View style={style.updatedAt}>
              <ResponsiveText size={12} style={style.createdAndUpdateTitle}>
                Decline At
              </ResponsiveText>
              <ResponsiveText size={13} style={style.createdAndUpdateSubTitle}>
                {renderDate(data?.updatedAt)}
              </ResponsiveText>
            </View>
          )}
        </View>
        <View style={style.buttonView}>
          <Button
            style={style.declineButton}
            onPress={() => {
              setVolunteerId(data?.volunteer?.volunteerId);
              removeRequest();
            }}>
            <ResponsiveText size={13} style={style.declineButtonText}>
              Decline
            </ResponsiveText>
          </Button>
          <Button
            style={style.accepteButton}
            onPress={() => {
              acceptRequest();
            }}>
            <ResponsiveText size={13} style={style.acceptButtonText}>
              Accept
            </ResponsiveText>
          </Button>
        </View>
      </View>
    </CardWrapper>
  );
}

const style = StyleSheet.create({
  requestCardMainView: {
    padding: vw(4),
  },
  imageAndNameView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageView: {
    height: vw(12),
    width: vw(12),
    borderRadius: 100,
    borderColor: '#fd7e14',
    borderWidth: 1,
  },
  nameAndEmailView: {
    marginLeft: 8,
  },
  volNameText: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  volEmailText: {
    color: '#939393',
    fontFamily: 'Montserrat-Regular',
  },
  createdAndUpdateView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: vw(3),
    borderBottomColor: '"#939393',
    borderBottomWidth: 1,
    paddingBottom: vw(3),
    marginBottom: vw(3),
  },
  updatedAt: {
    marginLeft: 15,
  },
  createdAndUpdateTitle: {
    color: '#939393',
    fontFamily: 'Montserrat-Regular',
  },
  createdAndUpdateSubTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  accepteButton: {
    backgroundColor: '#f06d06',
    marginLeft: vw(2),
  },
  declineButton: {
    backgroundColor: '#d3d3d3',
  },
  declineButtonText: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
  acceptButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
