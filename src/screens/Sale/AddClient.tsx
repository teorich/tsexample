import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import IOIcon from 'react-native-vector-icons/Ionicons';

import CustomHeader from '../../screens/components/CustomHeader';

import tw from '../../../tailwind';
import {useFocusEffect} from '@react-navigation/native';
import AIcon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MAIcon from 'react-native-vector-icons/MaterialIcons';
import OCIcon from 'react-native-vector-icons/Octicons';
import ProductAccordion from './components/ProductAccordion';
import {useRegisterSession} from '../../providers/RegisterSession.provider';
import AppModal from '../../screens/components/AppModal';
import AddCustomer from './AddCustomer';
import {useAgency} from '../../providers/AgencyProvider';

interface AddClientProps {
  setIsSelected: any;
  isSelected: boolean;
  navigation: any;
  isHome: boolean;
  route: any;
}

const productReducer = (prevState, action) => {
  let array;
  switch (action.type) {
    case 'INIT':
      array = action.payload.map(item => ({
        product: item,
        quantity: "",
        variants: {},
        price: "",
        discount: "",
        note: "",
        amount: ""
      }));
      return array;
    case 'CHANGE_QUANTITY':
      array = [...prevState];
      const quantity_index = array.findIndex(
        item => item.product._id === action.payload.id,
      );
      if (quantity_index !== -1) {
        array[quantity_index].quantity = action.payload.value;
        array[quantity_index].amount = (parseInt(array[quantity_index].quantity || 0, 10) * parseFloat(array[quantity_index].price || 0)).toString()
        
      }
      return array;
    case 'CHANGE_PRICE':
      array = [...prevState];
      const price_index = array.findIndex(
        item => item.product._id === action.payload.id,
      );
      if (price_index  !== -1) {
        array[price_index ].price = action.payload.value;
        array[price_index].amount = (parseInt(array[price_index].quantity || 0, 10) * parseFloat(array[price_index].price || 0)).toString()
        
      }
      return array;
    case 'CHANGE_DISCOUNT':
      array = [...prevState];
      const discount_index = array.findIndex(
        item => item.product._id === action.payload.id,
      );
      if (discount_index !== -1) {
        array[discount_index].discount = action.payload.value;
  
      }
      return array;
    case 'UPDATE_NOTE':
      array = [...prevState];
      const note_index = array.findIndex(
        item => item.product._id === action.payload.id,
      );
      if (note_index !== -1) {
        array[note_index].note = action.payload.value
          
      }
      return array;
    case 'CLEAR':
      return (prevState = []);
    default:
      break;
  }
};

const AddClient: React.FC<AddClientProps> = ({navigation, route}) => {
  const {params} = route;
  const {handleOpenRegisterSession, currentRegisterSession} =
    useRegisterSession();

  const {selectedAgency} = useAgency();

  const [state, dispatcher] = useReducer(productReducer, []);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [searchCustomer, setSearchCustomer] = useState<string>('');

  const [addCustomer, setAddCustomer] = useState<boolean>(false);


  useFocusEffect(
    React.useCallback(() => {
      dispatcher({type: 'INIT', payload: params.data});
      return () => {
        dispatcher({type: 'CLEAR'});
      };
    }, [params.data]),
  );

  const renderProduct = ({item}) => {
    return (
      <View
        style={tw.style('flex border-t border-b border-[#D8D8D8] bg-white')}>
        <View style={tw.style('flex-row m-6 items-center')}>
          <View style={tw.style('flex-2')}>
            <View
              style={tw.style(
                'h-73px w-73px border-blue border-2 items-center rounded-full',
              )}>
              <View style={tw.style('h-50px w-50px rounded m-auto')}>
                <ImageBackground
                  source={require('../../assets/images/capachino2.png')}
                  resizeMode="cover"
                  style={tw.style('h-50px w-50px rounded')}
                />
              </View>
            </View>
          </View>
          <View style={tw.style('flex-3')}>
            <View>
              <Text style={tw.style('text-dark font-medium')}>Capuccino</Text>
            </View>
            <View style={tw.style('mb-2')}>
              <Text>Moyen/maigre/aucun</Text>
            </View>
            <View style={tw.style('flex-row items-center')}>
              <View
                style={tw.style(
                  'h-30px w-30px border-[#E5E9F2] items-center border mx-2 rounded-full',
                )}>
                <Text style={tw.style('m-auto')}>+</Text>
              </View>
              <View>
                <Text
                  style={tw.style('m-auto leading-5 text-base font-medium')}>
                  1
                </Text>
              </View>
              <View
                style={tw.style(
                  'h-30px w-30px border-[#E5E9F2] items-center mx-2 border rounded-full',
                )}>
                <Text style={tw.style('m-auto')}>-</Text>
              </View>
            </View>
          </View>
          <View style={tw.style('flex-1 flex-row')}>
            <View style={tw.style('mx-2 text-dark')}>
              <Text style={tw.style('text-dark font-medium')}>3</Text>
            </View>
            <View>
              <Text style={tw.style('text-dark font-medium')}>FCFA</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw.style('flex-1 bg-[#E5E9F2]')}>
      <CustomHeader
        navigation={navigation}
        isHome={false}
        route={route}
        onSelect={() => {}}
      />
      <AppModal
        showModal={addCustomer}
        closeModal={() => setAddCustomer(false)}>
        <View style={tw.style(' bg-accent')}>
          <AddCustomer />
        </View>
      </AppModal>
      <ScrollView style={tw.style('mx-1')}>
        <View style={tw.style('my-2')}>
          <View
            style={tw.style(
              'flex-row justify-center border border-[#EDEEF0] bg-white  rounded items-center',
            )}>
            <AIcon name="search1" size={20} style={tw.style('p-3')} />
            <TextInput
              placeholder="Сhercher un produit par nom, code..."
              style={tw.style(
                'flex-1 pt-3 pb-3 pr-3  h-14 text-base pl-0 w-full',
              )}
            />
          </View>
        </View>

        <View style={tw.style('flex-row justify-center ml-3  my-3')}>
          <Pressable style={tw.style('flex-2 flex-row')}>
            <IOIcon
              name="ios-arrow-redo-sharp"
              size={20}
              style={tw.style('px-1')}
            />
            <Text>Retrieve</Text>
          </Pressable>
          <Pressable style={tw.style('flex-2 flex-row')}>
            <MAIcon name="restore" size={20} style={tw.style('px-1')} />
            <Text>Park</Text>
          </Pressable>
          <Menu onSelect={value => Alert.alert(`Selected number: ${value}`)}>
            <MenuTrigger>
              <View style={tw.style('flex-row mx-2')}>
                <OCIcon
                  name="triangle-down"
                  size={20}
                  style={tw.style('px-1')}
                />
                <Text>More</Text>
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                marginTop: 40,
                padding: 10,
              }}>
              <MenuOption value={1} text="Quote Sale" />
              <MenuOption value={2}>
                <Text>Mark as Unfulfulled...</Text>
              </MenuOption>
              <MenuOption value={3} text="Discard Sale" />
            </MenuOptions>
          </Menu>
        </View>
        {!!currentRegisterSession && (
          <>
            {!selectedCustomer ? (
              <View>
                <View style={tw.style('my-2')}>
                  <View
                    style={tw.style(
                      'flex-row justify-center rounded border border-[#EDEEF0] bg-white items-center',
                    )}>
                    <FAIcon name="user" size={20} style={tw.style('p-3')} />
                    <TextInput
                      placeholder="Add a customer"
                      onChangeText={setSearchCustomer}
                      value={searchCustomer}
                      style={tw.style(
                        'flex-1 pt-3 pb-3 pr-3  h-14 text-base pl-0 w-full',
                      )}
                    />
                  </View>
                </View>

                <View style={tw.style('')}>
                  <Menu opened={!!searchCustomer}>
                    <MenuTrigger />
                    <MenuOptions
                      optionsContainerStyle={tw.style(
                        'w-11/12 shadow-black shadow-color-opacity-25 rounded border border-[#E0E0E0]',
                      )}>
                      <OCIcon
                        name="triangle-up"
                        size={30}
                        style={tw.style(
                          'px-1 absolute -top-20px text-white rounded',
                        )}
                      />
                      <ScrollView style={{maxHeight: 200}}>
                        {[1, 2, 3].map(item => {
                          return (
                            <MenuOption
                              key={item}
                              onSelect={() => {
                                setSearchCustomer('');
                                setSelectedCustomer('Theo');
                              }}
                              text="Save"
                            />
                          );
                        })}
                        <MenuOption
                          style={tw.style('bg-[#E3F6F2]')}
                          onSelect={() => {
                            setSearchCustomer('');
                            setAddCustomer(true);
                          }}>
                          <View style={tw.style('my-1 bg-transparent')}>
                            <View
                              style={tw.style(
                                'flex-row bg-transparent rounded border-[#EDEEF0] items-center',
                              )}>
                              <FAIcon
                                name="plus-circle"
                                size={20}
                                style={tw.style('p-3 text-blue')}
                              />
                              <Text style={tw.style('text-blue')}>
                                Add {`"${searchCustomer}"`} as new customer
                              </Text>
                            </View>
                          </View>
                        </MenuOption>
                      </ScrollView>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
            ) : (
              <View
                style={tw.style('flex border border-[#D8D8D8] bg-white', {
                  'border-[#D8D8D8]': true,
                })}>
                <View style={tw.style('flex-row m-1 items-center')}>
                  <FAIcon name="user" size={20} style={tw.style('p-3')} />
                  <View style={tw.style('flex-1')}>
                    <View
                      style={tw.style(
                        'h-50px w-50px  items-center rounded-full',
                      )}>
                      <View style={tw.style(' items-center rounded m-auto')}>
                        <Text>hello</Text>
                      </View>
                    </View>
                  </View>
                  <View style={tw.style('flex-row')}>
                    <Pressable
                      style={tw.style(
                        'mx-3 border border-[#D8D8D8] items-center bg-[#F9F8FE] rounded',
                      )}>
                      <Text
                        style={tw.style('px-2 text-xs leading-5 items-center')}>
                        All customer
                      </Text>
                    </Pressable>

                    <Pressable
                      style={tw.style('mx-3')}
                      onPress={() => setSelectedCustomer('')}>
                      <AIcon name="delete" size={20} />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
        {/* <View>
        <FlatList
          contentContainerStyle={tw.style('')}
          data={state}
          keyExtractor={item => item.product._id} //has to be unique
          renderItem={renderProduct} //method to render the data in the way you want using styling u need
          horizontal={false}
        />
      </View> */}
        <View style={tw.style('')}>
          <ProductAccordion products={state} dispatch={(data) => dispatcher({type: data.type, payload: {id: data.payload.id, value: data.payload.value}})}/>
        </View>
        <ScrollView style={tw.style('flex bg-white h-full')}>
          <View
            style={tw.style(
              'flex bg-white items-center border-t border-b border-[#D8D8D8]',
            )}>
            <View style={tw.style('m-10')} />
          </View>
          <View style={tw.style('flex bg-white border-t  border-[#D8D8D8]')}>
            <View style={tw.style('border-b border-[#D8D8D8]')}>
              <View style={tw.style('flex-row mb-1 mt-2')}>
                <View style={tw.style('flex-2 items-center')}>
                  <Text>Notes</Text>
                </View>
                <View style={tw.style('flex-3')} />
                <View style={tw.style('flex-1')}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={tw.style('flex-row mb-1 mt-2')}>
                <View style={tw.style('flex-2 items-center')}>
                  <Text>Remise</Text>
                </View>
                <View style={tw.style('flex-3')} />
                <View style={tw.style('flex-1')}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={tw.style('flex-row mb-1 mt-2')}>
                <View style={tw.style('flex-2 items-center')}>
                  <Text>Sous-total</Text>
                </View>
                <View style={tw.style('flex-3')} />
                <View style={tw.style('flex-1')}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={tw.style('flex-row my-4')}>
                <View style={tw.style('flex-2 items-center')}>
                  <Text>Impôts</Text>
                </View>
                <View style={tw.style('flex-3')} />
                <View style={tw.style('flex-1')}>
                  <Text>3</Text>
                </View>
              </View>
            </View>
            <View style={tw.style('border-t  border-[#D8D8D8]')}>
              <View style={tw.style('flex-row my-4')}>
                <View style={tw.style('flex-2 items-center')}>
                  <Text>Total</Text>
                </View>
                <View style={tw.style('flex-3')} />
                <View style={tw.style('flex-1')}>
                  <Text>3</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={tw.style('my-4')}>
            <Pressable style={tw.style('h-14 bg-accent rounded mx-5')}>
              <Text
                style={tw.style('m-auto font-extrabold text-dark uppercase')}>
                PayER XAF900.00
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddClient;
