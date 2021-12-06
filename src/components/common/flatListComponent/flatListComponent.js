import React from 'react';
import {FlatList} from 'react-native';
import EmptyDataComponent from '../emptyDataComponent/emptyDataComponent';
import style from './flatListComponentStyle';

export default function FlatListComponent(props) {
  let {
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
