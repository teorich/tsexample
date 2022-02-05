import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomHeader from '../../screens/components/CustomHeader';

import tw from '../../../tailwind';
import {useShops} from '../../providers/ShopProvider';

interface ProductsProps {
  title?: string;
  navigation?: any;
  route?: any;
}

const Products: React.FunctionComponent<ProductsProps> = props => {
  const {selectedShop} = useShops();

  return (
    <>
      <CustomHeader
        navigation={props.navigation}
        isHome={true}
        route={props.route}
        onSelect={() => {}}
      />
      <View style={tw.style('flex-1 bg-[#E5E9F2]')}>
        <View>
          <Pressable
            onPress={() => props.navigation.navigate('CreateProduct')}
            style={tw.style(' mt-4 h-14 bg-accent rounded mx-5')}>
            <Text style={tw.style('m-auto font-extrabold text-dark uppercase')}>
              + Add type
            </Text>
          </Pressable>
        </View>
        <View style={tw.style('bg-[#FDFDFE]  border border-[#EDEEF0]  m-3')}>
          <View
            style={tw.style(
              'bg-[#FDFDFE] border border-[#EDEEF0] p-5 flex-row',
            )}>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <Text>display</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <Text>Type name</Text>
            </View>
          </View>
          <ScrollView
            style={tw.style('shadow-sm', {
              flexDirection: 'column',
            })}>
            {selectedShop &&
              selectedShop.products.map((product, index) => (
                <View
                  key={index}
                  style={tw.style(
                    'bg-[#FDFDFE]  border border-[#EDEEF0] flex-1 p-5',
                  )}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        flexDirection: 'row',
                      }}>
                      <BouncyCheckbox
                        size={20}
                        fillColor="#01b6eb"
                        unfillColor="#FFFFFF"
                        style={{
                          marginRight: 10,
                        }}
                        iconStyle={{borderColor: '#9ea6b8', borderRadius: 0}}
                        textStyle={{
                          fontFamily: 'Roboto',
                          textDecorationLine: 'none',
                          fontSize: 12,
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                        }}
                      />
                      <Text>{product.name}</Text>
                    </View>
                    <View style={{flex: 1, alignSelf: 'stretch'}}>
                      <Text>{product.description}</Text>
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Products;
