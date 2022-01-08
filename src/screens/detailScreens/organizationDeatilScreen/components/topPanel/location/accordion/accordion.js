import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Accordion} from 'native-base';
import {ResponsiveText} from '../../../../../../../components/common/common';
import {normalize} from '../../../../../../../responsive/responsive';

export default function CustomAccordion(props) {
  const {data} = props;
  return (
    <Accordion
      allowMultiple={false}
      allowToogle={true}
      defaultIndex={[0]}
      style={style.accordion}>
      {data?.map((item, i) => (
        <Accordion.Item key={i}>
          {({isExpanded}: any) => (
            <>
              <Accordion.Summary
                _expanded={style.accordionSummary}
                allowMultiple
                defaultIndex={[1]}>
                <ResponsiveText size={15} style={style.title}>
                  {item.title}
                </ResponsiveText>
                {isExpanded ? (
                  <Icon name="minus" size={normalize(15)} color={'#000'} />
                ) : (
                  <Icon name="plus" size={normalize(15)} color={'#000'} />
                )}
              </Accordion.Summary>
              <Accordion.Details style={style.accordionDetails}>
                {item.body}
              </Accordion.Details>
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

let style = StyleSheet.create({
  accordion: {borderColor: '#fff'},
  accordionSummary: {
    backgroundColor: '#fff',
    color: 'black',
    borderColor: '#fff',
  },
  accordionDetails: {
    borderColor: '#fff',
  },
  title: {
    fontWeight: '700',
    color: '#000',
  },
});
