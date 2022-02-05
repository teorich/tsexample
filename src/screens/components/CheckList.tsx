import {FlatList, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';

type CheckListProps = {
  list: Array<{id: number; name: string; code: string; isChecked: Boolean}>;
};

const CheckList: React.FC<CheckListProps> = props => {
  const [data, setData] = useState<
    {id: number; name: string; code: string; isChecked: Boolean}[]
  >([]);

  useEffect(() => {
    setData(props.list);
  }, [props]);

  const OnCheckChange = id => {
    const arr = [...data];
    const item = arr.find(item => item.id === id);
    if (item) {
      item.isChecked = !item.isChecked;
      setData(arr);
      // can use a callback to update parent from here
    }
  };
  return (
    <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              value={item.isChecked}
              onValueChange={() => OnCheckChange(item.id)}
            />
            <Text>{item.name}</Text>
          </View>
        );
      }}
    />
  );
};

export default CheckList;
