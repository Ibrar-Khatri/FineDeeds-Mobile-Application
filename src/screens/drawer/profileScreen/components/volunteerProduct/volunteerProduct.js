import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {ProfileScreenCardsHeader, ProfileScreenCardWrapper} from '..';
import {getMyProducts} from '../../../../../../graphql/queries';
import {
  CustomSpinner,
  FlatListComponent,
  ProductCard,
} from '../../../../../components/index';

export default function VolunteerProducts(props) {
  const {volunteer} = props;
  let [myProducts, setMyProducts] = useState(null);
  let [getProductsById, productsData] = useLazyQuery(getMyProducts);

  useEffect(() => {
    if (volunteer) {
      getProductsById({
        variables: {
          input: {
            limit: 4,
            filter: {
              status: 'AVAILABLE',
              seller: volunteer.volunteerId,
            },
          },
        },
      });
    }
  }, [volunteer]);

  useEffect(() => {
    if (productsData?.data?.getMyProducts?.items?.length >= 0) {
      setMyProducts(productsData?.data?.getMyProducts?.items);
    }
  }, [productsData?.data?.getMyProducts?.items]);

  return (
    <ProfileScreenCardWrapper>
      <ProfileScreenCardsHeader
        title="Products in charity store"
        // headerTitle="Products"
        screenName="listAll-screen"
        // initialRouteName="activity_list"
      />
      {myProducts?.length >= 0 ? (
        <FlatListComponent
          data={myProducts}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          emptyDataTitle="No Products"
          renderItem={({item, index}) => (
            <ProductCard key={index} productDetail={item} />
          )}
        />
      ) : (
        <CustomSpinner size="lg" color="#f06d06" />
      )}
    </ProfileScreenCardWrapper>
  );
}
