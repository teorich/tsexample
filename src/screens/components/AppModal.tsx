import React, { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import Modal from 'react-native-modal';

import Close from '../../assets/images/close.svg';
import tw from '../../../tailwind';

interface AppModalProps {
  title?: string;
  children?: any;
  showModal?: boolean;
  closeModal: () => void;
}

const AppModal: React.FunctionComponent<AppModalProps> = props => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={tw.style('rounded')}>
      <Modal
        deviceHeight={height}
        deviceWidth={width}
        isVisible={props.showModal}>
        <View>
          <Pressable style={tw.style("rounded-full my-2 left-80 bg-white w-28px h-28px")} onPress={() => props.closeModal()}>
            <Close />
          </Pressable>
        </View>
        <View style={tw.style('bg-transparent font-mulishBold rounded')}>
          {props.children}
        </View>
      </Modal>
    </View>
  );
};

// customBackdrop={
//   <View style={tw.style('flex-1 bg-black')}>
// <View>
//   <Pressable onPress={() => props.closeModal()}>
//     <Close />
//   </Pressable>
// </View>
//   </View>
// }

export default AppModal;
