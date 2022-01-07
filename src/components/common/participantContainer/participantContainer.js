import React from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';
import {Participant, ResponsiveText} from '../common';

export default function ParticipateContainer(props) {
  const {participants, title} = props;
  return (
    <View style={style.participantCardView}>
      <View style={style.participantCardHeader}>
        <ResponsiveText size={13} style={style.participantsTitle}>
          {title ? title : 'PARTICIPANTS'}
        </ResponsiveText>
        <ResponsiveText size={12} style={style.noOfparticipants}>
          {title
            ? participants?.length
              ? participants?.length
              : '0'
            : '1 Required'}
        </ResponsiveText>
      </View>
      <View style={style.participantView}>
        {participants?.length > 0 ? (
          participants?.map((parti, i) => (
            <Participant data={parti?.volunteer} key={i} />
          ))
        ) : (
          <ResponsiveText size={12} style={style.noParticipants}>
            {title ? 'No Donors' : 'No Participant'}
          </ResponsiveText>
        )}
      </View>
    </View>
  );
}

let style = StyleSheet.create({
  participantCardView: {
    borderColor: '#eaeaea',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: vw(4),
    marginTop: vw(4),
  },
  participantCardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    padding: vw(3),
  },
  participantsTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  noOfparticipants: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  participantView: {
    padding: vw(4),
  },
  noParticipants: {
    alignSelf: 'center',
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
});
