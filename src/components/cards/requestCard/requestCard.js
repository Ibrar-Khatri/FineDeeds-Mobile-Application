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
  const {data, acceptRequest, removeRequest, setVolunteerId, accepted} = props;

  function requestHandler(type) {
    setVolunteerId(data?.volunteer?.volunteerId);
    type === 'accept' ? acceptRequest() : removeRequest();
  }
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
        <View style={style.bodyView}>
          <View style={style.createdAndUpdateView}>
            {accepted ? (
              <>
                <View>
                  <ResponsiveText size={12} style={style.createdAndUpdateTitle}>
                    Approved By
                  </ResponsiveText>
                  <ResponsiveText
                    size={13}
                    style={style.createdAndUpdateSubTitle}>
                    {data?.approved?.volunteerName}
                  </ResponsiveText>
                </View>
                <View style={style.declineAndAcceptedView}>
                  <ResponsiveText size={12} style={style.createdAndUpdateTitle}>
                    Accepted At
                  </ResponsiveText>
                  <ResponsiveText
                    size={13}
                    style={style.createdAndUpdateSubTitle}>
                    {renderDate(data?.createdAt)}
                  </ResponsiveText>
                </View>
              </>
            ) : (
              <>
                <View>
                  <ResponsiveText size={12} style={style.createdAndUpdateTitle}>
                    Requested At
                  </ResponsiveText>
                  <ResponsiveText
                    size={13}
                    style={style.createdAndUpdateSubTitle}>
                    {renderDate(data?.createdAt)}
                  </ResponsiveText>
                </View>
                {data?.updatedAt && (
                  <View style={style.updatedAt}>
                    <ResponsiveText
                      size={12}
                      style={style.createdAndUpdateTitle}>
                      Decline At
                    </ResponsiveText>
                    <ResponsiveText
                      size={13}
                      style={style.createdAndUpdateSubTitle}>
                      {renderDate(data?.updatedAt)}
                    </ResponsiveText>
                  </View>
                )}
              </>
            )}
          </View>

          {data?.reason && (
            <View style={style.declineView}>
              <ResponsiveText size={12} style={style.createdAndUpdateTitle}>
                Reason
              </ResponsiveText>
              <ResponsiveText size={13} style={style.createdAndUpdateSubTitle}>
                {data?.reason}
              </ResponsiveText>
            </View>
          )}
        </View>

        <View style={style.buttonView}>
          <Button style={style.declineButton} onPress={requestHandler}>
            <ResponsiveText size={13} style={style.declineButtonText}>
              Decline
            </ResponsiveText>
          </Button>
          {acceptRequest && (
            <Button
              style={style.accepteButton}
              onPress={() => requestHandler('accept')}>
              <ResponsiveText size={13} style={style.acceptButtonText}>
                Accept
              </ResponsiveText>
            </Button>
          )}
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
  bodyView: {
    borderBottomColor: '"#939393',
    borderBottomWidth: 1,
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
    marginBottom: vw(3),
  },
  declineView: {
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
  declineAndAcceptedView: {
    marginLeft: vw(3),
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: vw(2),
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
