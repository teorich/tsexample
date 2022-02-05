import {View} from 'react-native';
import React from 'react';

interface AddClientProps {}

const AddClient: React.FC<AddClientProps> = props => {
  console.log('addclient', props);
  return (
    <View>
      <Text>add client</Text>
    </View>
  );
};

export default AddClient;
