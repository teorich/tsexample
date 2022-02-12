import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {BSON} from 'realm';

import CustomHeader from '../components/CustomHeader';
import {useReduxDispatch, useReduxSelector} from '../../store';
import {addCategory} from '../../store/productCategory';
import {registerShop} from '../../store/shop';
import {useShops} from '../../providers/ShopProvider';
import {useAgency} from '../../providers/AgencyProvider';

import tw from '../../../tailwind';

interface AddCategoryProps {
  title?: string;
  navigation?: any;
  route?: any;
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const AddCategory: React.FunctionComponent<AddCategoryProps> = props => {
  const dispatch = useReduxDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const {AddShopProductCategories, selectedShop} = useShops();
  const {AddAgencyProductCategories, selectedAgency} = useAgency();

  const populateCategory = async () => {
    if (categoryName && categoryDescription) {
      const category = {
        product_categories: [
          {
            id: new BSON.ObjectID(),
            name: categoryName,
            description: categoryDescription,
            parent_key: '',
          },
        ],
      };
      try {
        await AddShopProductCategories(selectedShop._id, category);
        await AddAgencyProductCategories(selectedAgency._id, category);
        props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }

      // const shop = handleGetOneShop(currentShop._id);
      // await dispatch(
      //   registerShop(JSON.parse(JSON.stringify(shop, getCircularReplacer()))),
      // );
      // await dispatch(
      //   addCategory({
      // id: new BSON.ObjectID().toString(),
      // name: categoryName,
      // description: categoryDescription,
      //   }),
      // );
    } else {
      Toast.show({
        type: 'error',
        text1: 'not all fields inputed',
      });
    }
  };

  return (
    <>
      <CustomHeader
        navigation={props.navigation}
        isHome={false}
        route={props.route}
        onSelect={() => {}}
      />
      <View>
        <View style={tw.style('m-3')}>
          <Text
            style={tw.style(
              'text-xs h-5 tracking-wider mb-3 leading-5 uppercase font-semibold ""',
            )}>
            Nom de catégorie
          </Text>
          <TextInput
            onChangeText={setCategoryName}
            value={categoryName}
            style={tw.style(
              ' rounded bg-[#FFFFFF] w-full text-4xl "" border border-[#EDEEF0]',
            )}
          />
        </View>
        <View style={tw.style('m-3')}>
          <Text
            style={tw.style(
              'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
            )}>
            description (facultatif)
          </Text>
          <View>
            <TextInput
              onChangeText={setCategoryDescription}
              value={categoryDescription}
              underlineColorAndroid="transparent"
              multiline={true}
              numberOfLines={10}
              style={tw.style(
                'text-4xl rounded bg-[#FFFFFF]  justify-start w-full h-137px "" border border-[#EDEEF0]',
                {textAlignVertical: 'top'},
              )}
            />
          </View>
        </View>
      </View>
      <View style={tw.style('absolute bottom-0 w-full items-center mb-5')}>
        <Pressable
          style={tw.style('mt-4 h-14 bg-accent rounded w-72')}
          onPress={() => populateCategory()}>
          <Text style={tw.style('m-auto font-extrabold text-dark uppercase')}>
            enrégistrer
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default AddCategory;
