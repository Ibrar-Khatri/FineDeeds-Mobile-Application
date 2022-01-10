import React from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../../../responsive/responsive';
import {
  ContributorCard,
  EmptyDataComponent,
  ResponsiveText,
} from '../../../../../../components/index';

export default function OurTeam(props) {
  const {orgVolunteers, orgStaff} = props;
  return (
    <View>
      {orgStaff?.length > 0 && (
        <>
          <ResponsiveText size={17} style={style.titleStyle}>
            Staff
          </ResponsiveText>
          <View style={style.cardView}>
            {orgStaff?.map((team, i) => (
              <ContributorCard key={i} data={team} />
            ))}
          </View>
        </>
      )}
      {orgVolunteers &&
        orgVolunteers?.map((team, i) => (
          <View key={i}>
            <ResponsiveText size={17} style={style.titleStyle}>
              {team.volunteerType === null ||
              team.volunteerType.toLowerCase() === 'volunteer'
                ? 'Volunteer'
                : team.volunteerType}
            </ResponsiveText>
            <View style={style.cardView}>
              <ContributorCard key={i} data={team.volunteer} />
            </View>
          </View>
        ))}

      {orgVolunteers?.length <= 0 && orgStaff?.length <= 0 && (
        <EmptyDataComponent title="No Team" />
      )}
    </View>
  );
}

let style = StyleSheet.create({
  cardView: {marginBottom: vw(3), alignItems: 'center'},
  titleStyle: {
    color: '#212529',
    fontWeight: '500',
    marginBottom: vw(3),
  },
});
