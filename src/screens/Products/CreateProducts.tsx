import {Formik, useFormikContext} from 'formik';
import Realm from 'realm';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CustomHeader from '../components/CustomHeader';
import DropdownComponent from '../components/DropdownComponent';

import {useReduxDispatch, useReduxSelector} from '../../store';
import {clearCategory} from '../../store/productCategory';
import {useProducts} from '../../providers/ProductProvider';

import MetaArrow from '../../assets/images/MetaArrow.svg';

import tw from '../../../tailwind';
import {registerShop} from '../../store/shop';
import {useShops} from '../../providers/ShopProvider';
import {useAgency} from '../../providers/AgencyProvider';

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

interface CreateProductsProps {
  title?: string;
  route?: any;
  navigation?: any;
  isHome: boolean;
}

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Produit Simple sans variante',
    value: 'standard',
    size: 18,
    color: '#01b6eb',
    labelStyle: tw.style('text-dark text-xs font-normal "" w-165px'),
    selected: false,
  },
  {
    id: '2',
    label: 'Produit avec variante',
    value: 'variant',
    size: 18,
    color: '#01b6eb',
    labelStyle: tw.style('text-dark text-xs font-normal "" w-165px'),
    selected: false,
  },
  {
    id: '3',
    label: 'Produit composite',
    value: 'composite',
    size: 18,
    color: '#01b6eb',
    labelStyle: tw.style('text-dark text-xs font-normal "" w-165px'),
    selected: false,
  },
];

const radio_props: any = [
  {label: 'Produit Simple sans variante', value: 'standard'},
  {label: 'Produit avec variante', value: 'variant'},
  {label: 'Produit composite', value: 'composite'},
];

const CreateProduct: React.FunctionComponent<CreateProductsProps> = ({
  route,
  navigation,
}) => {
  // const [radioButtons, setRadioButtons] =
  //   useState<RadioButtonProps[]>(radioButtonsData);

  const {categories} = useReduxSelector(state => state.category);
  const [selectedValue, setSelectedsValue] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const {selectedShop} = useShops();
  const {selectedAgency} = useAgency();
  // const {
  //   currentShop: {product_categories, _id},
  // } = useReduxSelector(state => state.shop);

  const {product_categories, _id} = selectedShop;

  const [agencyCategories, setAgencyCategories] = useState([
    ...product_categories,
  ]);
  // const [dataCategory] = useState(
  //   product_categories.map(item => ({
  //     label: item.name,
  //     value: item.id,
  //   })),
  // );

  // const {currentShop} = useReduxSelector(state => state.shop);

  const dataCategory: any = product_categories.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const dispatch = useReduxDispatch();

  const [radioProduct] = useState<any[]>(radio_props);

  const radioProductRef = useRef(null);

  const [currentProductType, setCurrentProductType] = useState<any>();

  const {params} = route;

  const {handleAddProduct} = useProducts();

  useEffect(() => {
    if (selectedValue) {
      const result = agencyCategories.find(value => value.id === selectedValue);
      setSelectedCategory(result);
    }
  }, [selectedValue, agencyCategories]);

  useEffect(() => {
    setSelectedCategory(null);
    setSelectedsValue(null);
  }, []);

  // function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
  //   // console.log(radioButtonsArray.filter(value => value.selected === true));
  //   const selected = radioButtonsArray.filter(value => value.selected === true);
  //   const selectedIndex = radioButtonsArray.findIndex(
  //     value => value.selected === true,
  //   );
  //   setCurrentProductType(selected[0].value);
  //   setRadioButtons(
  //     radioButtonsArray.map(item =>
  //       item.value === currentProductType ? {...item, selected: true} : item,
  //     ),
  //   );

  //   console.log('current', radioButtonsArray);
  // }

  useEffect(() => {
    if (currentProductType) {
      const selectedIndex = radioProduct.findIndex(
        val => val.value === currentProductType,
      );
      radioProductRef.current.updateIsActiveIndex(selectedIndex);
    }
  }, [currentProductType, radioProduct]);

  useEffect(() => {
    if (params && params.productType) {
      setCurrentProductType(params.productType);
    }
  }, [params]);

  const create = async values => {
    values.product_categories = [
      {...selectedCategory, id: new Realm.BSON.ObjectId(selectedCategory.id)},
    ];
    try {
      await handleAddProduct(values, _id, selectedAgency._id);
      // const shop = await handleGetOneShop(_id);
      // await dispatch(
      //   registerShop(JSON.parse(JSON.stringify(shop, getCircularReplacer()))),
      // );
      navigation.navigate('Products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        isHome={false}
        route={route}
        onSelect={() => {}}
      />
      <ScrollView style={tw.style('flex-1 bg-[#E5E9F2]')}>
        <Formik
          initialValues={{
            name: '',
            product_categories: [selectedCategory],
            description: '',
            sku: '',
            shopId: [selectedShop],
          }}
          onSubmit={create}>
          {formik => (
            <>
              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5 mb-5',
                )}>
                <View style={tw.style('m-5')}>
                  <View>
                    <Text
                      style={tw.style(
                        'font-medium m-auto text-dark "" uppercase',
                      )}>
                      TYPE DE produit
                    </Text>
                    <RadioForm
                      ref={radioProductRef}
                      radio_props={radioProduct}
                      initial={-1}
                      onPress={value => {
                        console.log(value);
                      }}
                    />
                    {/* <RadioButtons /> */}
                  </View>
                </View>
              </View>
              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 mb-5',
                )}>
                <View style={tw.style('mb-4 mt-4')}>
                  <Text style={tw.style('m-auto leading-5 font-medium')}>
                    CATÉGORIE
                  </Text>
                </View>

                <View style={tw.style('mb-4')}>
                  <View style={tw.style('mt-4')}>
                    <DropdownComponent
                      data={dataCategory}
                      value={selectedValue}
                      setValue={setSelectedsValue}
                    />
                  </View>

                  <View style={tw.style('flex-row m-auto')}>
                    <Pressable
                      onPress={() => navigation.navigate('AddCategory')}
                      style={tw.style(
                        'border-accent w-137px border-2 rounded h-12 m-2',
                      )}>
                      <Text
                        style={tw.style(
                          'm-auto font-bold text-center text-dark uppercase',
                        )}>
                        + AJOUTER UNE CATÉGORIE
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => navigation.navigate('CategoryList')}
                      style={tw.style('bg-accent rounded w-137px h-12 m-2')}>
                      <Text
                        style={tw.style(
                          'm-auto text-center font-bold text-dark uppercase',
                        )}>
                        voire tous le categorie
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 mb-5',
                )}>
                <View style={tw.style('mb-4 mt-4')}>
                  <Text
                    style={tw.style('m-auto leading-5 uppercase font-medium')}>
                    information principale
                  </Text>
                </View>

                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    product name
                  </Text>
                  <TextInput
                    onChangeText={formik.handleChange('name')}
                    onBlur={formik.handleBlur('name')}
                    value={formik.values.name}
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>

                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    sku
                  </Text>
                  <TextInput
                    onChangeText={formik.handleChange('sku')}
                    onBlur={formik.handleBlur('sku')}
                    value={formik.values.sku}
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>

                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    code fournisseur
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>

                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    custom field
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>

                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    description
                  </Text>
                  <View>
                    <TextInput
                      onChangeText={formik.handleChange('description')}
                      onBlur={formik.handleBlur('description')}
                      value={formik.values.description}
                      underlineColorAndroid="transparent"
                      multiline={true}
                      numberOfLines={10}
                      style={tw.style(
                        ' text-xs rounded bg-[#FFFFFF]  justify-start w-full h-137px "" border border-[#EDEEF0]',
                        {textAlignVertical: 'top'},
                      )}
                    />
                  </View>
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 mb-5',
                )}>
                <View style={tw.style('mb-4 mt-4')}>
                  <Text style={tw.style('m-auto leading-5 font-medium')}>
                    CATÉGORIE
                  </Text>
                </View>

                <View style={tw.style('ml-38px mb-4')}>
                  <Text>Track inventaire for this project</Text>
                  <View style={tw.style('flex-row')}>
                    <View
                      style={tw.style('mr-4 ml-4 items-center self-center')}>
                      <TouchableOpacity
                        style={tw.style(
                          'md:w-14 md:h-2 w-10 flex border rounded-full p-2 mt-1 relative',
                        )}>
                        {/* Switch */}
                      </TouchableOpacity>
                      <View style={false ? styles.toggleOn : styles.child} />
                    </View>
                    <View>
                      <Text style={tw.style('w-213px')}>
                        Voullez vous contôler les movements de stock de ce
                        produit?
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 mb-5',
                )}>
                <View style={tw.style('mb-4 mt-4')}>
                  <Image
                    source={require('../../assets/images/CupOfCoffee.png')}
                  />
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5 mt-6 mb-6',
                )}>
                <View style={tw.style('m-5')}>
                  <Text
                    style={tw.style(
                      'text-dark uppercase font-medium text-dark',
                    )}>
                    canal de vente
                  </Text>
                </View>
                <View style={tw.style('w-full border-t border-[#9EA6B8]')} />
                <View style={tw.style('m-5 flex flex-wrap')}>
                  <View style={tw.style('flex')}>
                    <BouncyCheckbox
                      size={20}
                      fillColor="#01b6eb"
                      unfillColor="#FFFFFF"
                      text="Point de vente"
                      style={{
                        marginRight: 10,
                        marginBottom: 10,
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
                    <BouncyCheckbox
                      size={20}
                      fillColor="#01b6eb"
                      unfillColor="#FFFFFF"
                      text="E-Commerce"
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
                  </View>
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5 mt-6 mb-6',
                )}>
                <View style={tw.style('m-5')}>
                  <Text
                    style={tw.style(
                      'text-dark uppercase font-medium text-dark',
                    )}>
                    catégories
                  </Text>
                </View>
                <View style={tw.style('w-full border-t border-[#9EA6B8]')} />
                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    catégories du produit
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>
                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    fournisseur
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>
                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    marque
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>
                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    label
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>
                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    saison
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>
                <View style={tw.style('m-3')}>
                  <Text
                    style={tw.style(
                      'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                    )}>
                    additional loayalty ponts
                  </Text>
                  <TextInput
                    style={tw.style(
                      ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                    )}
                  />
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] mx-4 flex-row flex-1 p-5 mt-6 mb-6',
                )}>
                <View style={tw.style('m-2 flex flex-row')}>
                  <View style={tw.style('justify-evenly')}>
                    <Text
                      style={tw.style(
                        'text-dark uppercase font-medium text-dark',
                      )}>
                      meta
                    </Text>
                  </View>
                  <View style={tw.style('absolute left-72 justify-evenly')}>
                    <MetaArrow />
                  </View>
                </View>
              </View>

              <View
                style={tw.style(
                  'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5 mt-6 mb-6',
                )}>
                <View style={tw.style('m-5')}>
                  <Text
                    style={tw.style(
                      'text-dark uppercase font-medium text-dark',
                    )}>
                    optional extras
                  </Text>
                </View>
                <View style={tw.style('w-full border-t border-[#9EA6B8]')} />
                <View style={tw.style('mt-4')}>
                  <DropdownComponent />
                </View>
              </View>

              <View style={tw.style('mb-3')}>
                <View style={tw.style('flex-row m-auto')}>
                  <Pressable
                    style={tw.style(
                      'border-accent w-129px border-2 rounded h-12 mr-3',
                    )}>
                    <Text
                      style={tw.style(
                        'm-auto font-bold text-center text-dark uppercase',
                      )}>
                      annuler
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={formik.handleSubmit}
                    style={tw.style('bg-accent rounded w-129px h-12 ml-3')}>
                    <Text
                      style={tw.style(
                        'm-auto text-center font-bold text-dark uppercase',
                      )}>
                      enrégistrer
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
  child: {
    height: 25,
    width: 25,
    position: 'absolute',
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -18,
    backgroundColor: '#3e5066',
    transform: [{translateX: 10}],
  },
  toggleOn: {
    height: 25,
    width: 25,
    position: 'absolute',
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -18,
    backgroundColor: '#01b6eb',
    borderColor: '#01b6eb',
    transform: [{translateX: 38}],
  },
});

export default CreateProduct;
