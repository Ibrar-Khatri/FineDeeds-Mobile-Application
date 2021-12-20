import React from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet} from 'react-native';

export default function ListAllItem(props) {
  const {
    data,
    renderItem,
    onEndReached,
    refreshControl,
    ListFooterComponent,
    ListEmptyComponent,
  } = props;
  return (
    <FlatList
      data={data}
      contentContainerStyle={style.scrollViewStyle}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={refreshControl}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

const style = StyleSheet.create({
  scrollViewStyle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
});
