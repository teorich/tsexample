import React from 'react';
import {Pressable, useWindowDimensions, View} from 'react-native';
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
  const {height, width} = useWindowDimensions();
  return (
    <View style={tw.style(' rounded')}>
      <Modal
        deviceHeight={height}
        deviceWidth={width}
        isVisible={props.showModal}>
        <View style={tw.style('bg-white ""Bold rounded')}>
          {props.children}
        </View>
      </Modal>
    </View>
  );
};

// customBackdrop={
//   <View style={tw.style('flex-1 bg-black')}>
//     <View>
//       <Pressable onPress={() => props.closeModal()}>
//         <Close />
//       </Pressable>
//     </View>
//   </View>
// }

export default AppModal;
