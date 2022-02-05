import React from 'react';
import {Text, View} from 'react-native';

interface NameStoreProps {
  title?: string;
}

const NameStore: React.FunctionComponent<NameStoreProps> = () => {
  return (
    <View>
      <Text>Name store list</Text>
    </View>
  );
};

export default NameStore;
