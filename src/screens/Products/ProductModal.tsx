import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import StandardProduct from '../../assets/images/StandardProduct.svg';
import VariantProduct from '../../assets/images/VariantProduct.svg';
import CompositeProduct from '../../assets/images/CompositeProduct.svg';

import tw from '../../../tailwind';

interface ProductModalProps {
  title?: string;
  navigation?: any;
  setShowModal?: any;
}

const ProductModal: React.FunctionComponent<ProductModalProps> = props => {
  return (
    // <FlatList
    //   contentContainerStyle={tw.style('bg-[#F9F8FE] items-center')}
    //   data={DATA}
    //   renderItem={item => (
    //     <Pressable
    //       style={tw.style(
    //         '""Bold border border-2 m-1 rounded-t-md',
    //         'border-[#E5E9F2]',
    //       )}>
    //       <View style={tw.style('items-center mt-3 bg-[#FCFDFF]')}>
    //         {item.item.svgComponent()}
    //       </View>
    //       <View
    //         style={tw.style(
    //           '""Bold items-center p-4 m-auto mt-5 mb-5 rounded-t-md w-full',
    //         )}>
    //         <Text
    //           style={tw.style(
    //             'font-bold text-sm leading-5 "" text-dark',
    //           )}>
    //           Standard Product
    //         </Text>
    //         <Text style={tw.style(' font-semibold mt-1 ""')}>
    //           A single SKU with it’s own inventory
    //         </Text>
    //       </View>
    //     </Pressable>
    //   )}
    //   keyExtractor={item => item.id}
    // />

    <ScrollView style={tw.style('h-600px rounded-md')}>
      <Pressable
        onPress={() => {
          props.setShowModal(false);
          props.navigation.navigate('ProductStack', {
            screen: 'CreateProduct',
            params: {productType: 'standard'},
          });
        }}
        style={tw.style(
          '""Bold border border-2 m-4 rounded-t-md',
          'border-[#E5E9F2]',
        )}>
        <View style={tw.style('items-center mt-3 bg-[#FCFDFF]')}>
          <StandardProduct />
        </View>
        <View
          style={tw.style(
            '""Bold items-center p-4 m-auto mt-5 mb-5 rounded-t-md w-full',
          )}>
          <Text
            style={tw.style(
              'font-bold text-sm leading-5 "" text-dark',
            )}>
            Standard Product
          </Text>
          <Text style={tw.style(' font-semibold mt-1 ""')}>
            A single SKU with it’s own inventory
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          props.setShowModal(false);
          props.navigation.navigate('ProductStack', {
            screen: 'CreateProduct',
            params: {productType: 'variant'},
          });
        }}
        style={tw.style(
          '""Bold border border-2 m-4 rounded-t-md',
          'border-[#E5E9F2]',
        )}>
        <View style={tw.style('items-center mt-3 bg-[#FCFDFF]')}>
          <VariantProduct />
        </View>
        <View
          style={tw.style(
            '""Bold items-center p-4 m-auto mt-5 mb-5 rounded-t-md w-full',
          )}>
          <Text
            style={tw.style(
              'font-bold text-sm leading-5 "" text-dark',
            )}>
            Variant Product
          </Text>
          <Text style={tw.style(' font-semibold mt-1 ""')}>
            A group of similar products with different attributes
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          props.setShowModal(false);
          props.navigation.navigate('ProductStack', {
            screen: 'CreateProduct',
            params: {productType: 'composite'},
          });
        }}
        style={tw.style(
          '""Bold border border-2 m-4 rounded-t-md',
          'border-[#E5E9F2]',
        )}>
        <View style={tw.style('items-center mt-3 bg-[#FCFDFF]')}>
          <CompositeProduct />
        </View>
        <View
          style={tw.style(
            '""Bold items-center p-4 m-auto mt-5 mb-5 rounded-t-md w-full',
          )}>
          <Text
            style={tw.style(
              'font-bold text-sm leading-5 "" text-dark',
            )}>
            Composite Product
          </Text>
          <Text style={tw.style(' font-semibold mt-1 ""')}>
            Specified quantity of one or two products
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default ProductModal;
