import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Formik, useFormikContext} from 'formik';

import tw from '../../../tailwind';
import {TextInput} from 'react-native-gesture-handler';

type Props = {};

const FirstRoute = () => {
  const {values, initialValues} = useFormikContext();

  return (
    <ScrollView
      style={tw.style(
        'rounded bg-transparent h-full mx-3 border-[#EDEEF0] border-t-2 mb-10',
      )}>
      <View style={tw.style('flex mt-10')}>
        <View style={tw.style('flex-row')}>
          <View style={tw.style('flex-1 mr-2')}>
            <Text>First Name</Text>
            <TextInput
              style={tw.style(
                'border  text-lg rounded border-[#EDEEF0] bg-[#FFFFFF] h-38px mt-1',
              )}
            />
          </View>
          <View style={tw.style('flex-1 ml-2')}>
            <Text>Last Name</Text>
            <TextInput
              style={tw.style(
                'border mt-1 rounded border-[#EDEEF0] bg-[#FFFFFF] h-38px',
              )}
            />
          </View>
        </View>
        <View style={tw.style('flex-row mt-4')}>
          <View style={tw.style('flex-1 mr-2')}>
            <Text>Email</Text>
            <TextInput
              style={tw.style(
                'border rounded border-[#EDEEF0] bg-[#FFFFFF] h-38px mt-1',
              )}
            />
          </View>
          <View style={tw.style('flex-1 ml-2')}>
            <Text>Contact Number</Text>
            <TextInput
              style={tw.style(
                'border mt-1 rounded border-[#EDEEF0] bg-[#FFFFFF] h-38px',
              )}
            />
          </View>
        </View>
        <View style={tw.style('flex-row mt-4')}>
          <View style={tw.style('flex-1 mr-2')}>
            <Text>Customer Group</Text>
            <TextInput
              style={tw.style(
                'border rounded border-[#EDEEF0] bg-[#FFFFFF] h-38px mt-1',
              )}
            />
          </View>
          <View style={tw.style('flex-1')}>
            <View style={tw.style(' mb-4')}>
              <Text style={tw.style('text-10px')}>
                Track inventaire for this project
              </Text>
              <View style={tw.style('flex-row')}>
                <View style={tw.style('mr-1 ml-4 items-center self-center')}>
                  <TouchableOpacity
                    style={tw.style(
                      'md:w-14 md:h-18px w-34px h-18px flex border border-blue rounded-20px p-2  relative',
                    )}>
                    {/* Switch */}
                  </TouchableOpacity>
                  <View style={false ? styles.toggleOn : styles.child} />
                  <Text
                    style={tw.style(
                      'absolute right-6px text-blue bottom-1px items-center text-center',
                    )}>
                    x
                  </Text>
                </View>
                <View>
                  <Text style={tw.style('text-10px leading-3')}>
                    Opt-In to Marketing and Promotional Emails
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const SecondRoute = () => {
  const {values, initialValues} = useFormikContext();
  return (
    <View
      style={tw.style(
        'rounded mx-3 bg-transparent border-[#EDEEF0] border-t-2',
      )}>
      <Text>Details</Text>
    </View>
  );
};

const renderTabBar = props => (
  <TabBar
    contentContainerStyle={tw.style(' text-dark')}
    labelStyle={tw.style(' text-10px -ml-10 mt-5 text-dark w-50px')}
    {...props}
    indicatorStyle={tw.style('absolute bg-blue top-50px w-50px')}
    style={tw.style(
      'bg-transparent  shadow-none border-0  ml-4 h-50px w-200px bg-white',
    )}
    tabStyle={tw.style(' text-justify')}
  />
);

const AddCustomer = (props: Props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Contact'},
    {key: 'second', title: 'Details'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <Formik
      initialValues={{email: ''}}
      onSubmit={values => console.log(values)}>
      {formik => (
        <View style={tw.style('rounded bg-[#FDFDFE]', {height: layout.height * 0.7})}>
          <View style={tw.style('mx-3 mt-6')}>
            <Text
              style={tw.style(
                'font-medium text-base leading-5 text-[#333333]',
              )}>
              Add Customer
            </Text>
          </View>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />

<View style={tw.style('absolute bottom-10 right-10')}>
        <Pressable style={tw.style('bg-accent rounded w-147px h-32px ml-3')}>
          <Text
            style={tw.style(
              'm-auto text-10px text-center font-bold text-dark uppercase'
            )}>
            Create New Customer
          </Text>
        </Pressable>
      </View>
        </View>
      )}

      
    </Formik>
  );
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
  child: {
    height: 18,
    width: 19.18,
    position: 'absolute',
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -18,
    backgroundColor: '#fff',
    borderColor: '#01b6eb',
    borderWidth: 1,
    transform: [{translateX: -10}],
  },
  toggleOn: {
    height: 18,
    width: 19.18,
    position: 'absolute',
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -18,
    backgroundColor: '#01b6eb',
    borderColor: '#01b6eb',
    borderWidth: 1,
    transform: [{translateX: 10}],
  },
});

export default AddCustomer;
