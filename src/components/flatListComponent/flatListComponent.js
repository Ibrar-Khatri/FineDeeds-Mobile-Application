import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {EmptyDataComponent} from '../index';

export default function FlatListComponent(props) {
  const {
    data,
    horizontal,
    showsHorizontalScrollIndicator,
    emptyDataTitle,
    ListEmptyComponent,
    renderItem,
  } = props;

  return (
    <FlatList
      data={data && data}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={style.contentContainerStyle}
      ListEmptyComponent={
        emptyDataTitle ? (
          <EmptyDataComponent title={emptyDataTitle} />
        ) : (
          ListEmptyComponent
        )
      }
      renderItem={renderItem && renderItem}
    />
  );
}

let style = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
