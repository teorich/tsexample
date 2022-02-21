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
        backdropOpacity={0.8}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        animationInTiming={800}
        animationOutTiming={800}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        isVisible={props.showModal}>
      
          <Pressable style={tw.style("rounded-full items-center my-2 left-80 bg-white w-33px h-33px")} onPress={() => props.closeModal()}>
            <Close style={tw.style("m-auto items-center")} />
          </Pressable>
      
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
