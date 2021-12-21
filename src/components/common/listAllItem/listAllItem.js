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
  console.log(data.length, 'data');
  return (
    <FlatList
      data={data}
      contentContainerStyle={[
        style.contentContainerStyle,
        data.length === 0 && {justifyContent: 'center'},
      ]}
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
  contentContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
});
