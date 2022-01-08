import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {StyleSheet, View} from 'react-native';
import Events from './events/events';
import Description from './description/description';
import OurTeam from './ourTeam/ourTeam';
import Projects from './projects/projects';
import {Tabs} from '../../../../../components/common/common';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {
  getOrgStaff,
  getOrgVolunteers,
  getPastEvents,
  getProjects,
  getUpcomingEvents,
} from '../../../../../../graphql/queries';

export default function BottomPanel(props) {
  const {org} = props;
  let [index, setIndex] = useState(0);
  let [orgStaff, setOrgStaff] = useState(null);
  let [orgVolunteers, setOrgVolunteers] = useState(null);
  let [pastEvents, setPastEvents] = useState(null);
  let [upcomingEvents, setUpcomingEvents] = useState(null);
  let [projects, setProjects] = useState(null);

  const [getOrgStaffById, orgStaffData] = useLazyQuery(getOrgStaff);
  const [getOrgVolunteersById, orgVolunteersData] =
    useLazyQuery(getOrgVolunteers);
  const [getPastEventsById, pastEventData] = useLazyQuery(getPastEvents);
  const [getUpcomingEventsById, upcomingEventData] =
    useLazyQuery(getUpcomingEvents);
  const [getProjectsById, projectsData] = useLazyQuery(getProjects);

  useEffect(() => {
    if (org) {
      const {orgId} = org;
      getOrgStaffById({
        variables: {orgId, status: 'ACTIVATE'},
      });
      getOrgVolunteersById({
        variables: {orgId, orderByVolunteerType: true, status: 'ACCEPTED'},
      });
      getPastEventsById({
        variables: {orgId},
      });
      getUpcomingEventsById({
        variables: {orgId},
      });
      getProjectsById({
        variables: {orgId},
      });
    }
  }, [org]);
  useEffect(() => {
    !orgStaff &&
      orgStaffData?.data?.getOrgStaff &&
      setOrgStaff(orgStaffData?.data?.getOrgStaff);
    !orgVolunteers &&
      orgVolunteersData?.data?.getOrgVolunteers &&
      setOrgVolunteers(orgVolunteersData?.data?.getOrgVolunteers);
    !pastEvents &&
      pastEventData?.data?.getPastEvents &&
      setPastEvents(pastEventData?.data?.getPastEvents);

    !upcomingEvents &&
      upcomingEventData?.data?.getUpcomingEvents &&
      setUpcomingEvents(upcomingEventData?.data?.getUpcomingEvents);
    !projects &&
      projectsData?.data?.getProjects &&
      setProjects(projectsData?.data?.getProjects?.items);
  }, [
    orgStaffData?.data,
    orgVolunteersData?.data,
    pastEventData?.data,
    upcomingEventData?.data,
    projectsData?.data,
  ]);

  let tabs = [
    {
      title: 'Description',
      isFocused: false,
      component: <Description org={org} />,
    },
    {
      title: 'Our Team',
      isFocused: false,
      component: <OurTeam orgVolunteers={orgVolunteers} orgStaff={orgStaff} />,
    },
    {
      title: 'Events',
      isFocused: false,
      component: (
        <Events pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
      ),
    },
    {
      title: 'Projects',
      isFocused: false,
      component: <Projects data={projects} />,
    },
  ];
  tabs[index].isFocused = tabs[index].isFocused ? false : true;

  return (
    <View style={style.bottomPanelMainView}>
      <Tabs index={index} setIndex={setIndex} tabs={tabs} />
      <View style={style.tabComponentsView}>{tabs[index].component}</View>
    </View>
  );
}

let style = StyleSheet.create({
  bottomPanelMainView: {
    margin: vw(3),
  },
  tabComponentsView: {
    marginTop: vw(3),
  },
});
