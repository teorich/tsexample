import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {  SafeAreaView } from 'react-native-safe-area-context'

import tw from '../../../tailwind';
import CustomIcon from '../../../customIcon';
import {useTopBarMenu} from '../../providers/TopBarMenuProvider';

interface CustomHeaderProps {
  navigation?: any;
  isHome?: boolean;
  route?: any;
  label?: string;
  data?: Array<{label: string; value: string}>;
  onSelect: (item: {label: string; value: string}) => void;
}

interface IRightMenu {
  item: {
    label: string;
    value: string;
    icon: string;
    active: boolean;
    method: () => {};
  };
}

const CustomHeader: React.FunctionComponent<CustomHeaderProps> = ({
  navigation,
  isHome,
  route,
  label,
  data,
  onSelect,
}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const {menu} = useTopBarMenu();

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        h: number,
        _px: number,
        py: number,
      ) => {
        setDropdownTop(py + h);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const renderItem = ({item}: IRightMenu): ReactElement<any, any> => {
    return item.active ? (
      <TouchableOpacity
        onPress={() => {
          item.method();
          setVisible(false);
        }}>
        <View style={tw.style('text-gray-700 flex-row flex  text-sm')}>
          <CustomIcon
            name={item.icon}
            size={22}
            style={tw.style('my-2 pl-5')}
            color={tw.color('dark')}
          />
          <Text style={tw.style('text-lg my-1 ml-4 mr-20 font-bold')}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <View />
    );
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View
            style={tw.style(
              'top-11 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white focus:outline-none',
            )}>
            <FlatList
              data={menu}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <>
    <SafeAreaView>
      <View style={tw.style('flex-row bg-white h-50px shadow-md relative')}>
        {isHome ? (
          <View style={tw.style('flex-1 justify-center')}>
            <Pressable>
              <CustomIcon
                name="burger"
                size={25}
                color={tw.color('dark')}
                style={tw.style('p-3')}
              />
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={tw.style('flex-1 justify-center')}
            onPress={() => navigation.goBack()}>
            <CustomIcon
              name="leftarrow"
              size={25}
              style={tw.style('p-3')}
              color={tw.color('blue')}
            />
          </Pressable>
        )}
        <View style={tw.style('flex-4 justify-center')}>
          <Text style={tw.style('text-center', !isHome && 'text-blue')}>
            {(route && route.name) || 'test'}
          </Text>
        </View>
        {isHome && (
          <TouchableOpacity
            ref={DropdownButton}
            onPress={toggleDropdown}
            style={tw.style('flex-1 justify-center')}>
            <CustomIcon
              name="horizontal3dots"
              size={25}
              style={tw.style('m-3')}
            />
          </TouchableOpacity>
        )}
        <View style={tw.style('top-72')}>{renderDropdown()}</View>
      </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '70%',
    minHeight: '50%',
    maxHeight: '60%',
    shadowColor: '#0e0b0b',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    right: 0,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default CustomHeader;
