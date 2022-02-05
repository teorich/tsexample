import React from 'react';
import {View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

interface RadioButtonsProps {
  title?: string;
}

const radio_props: any = [
  {label: 'Produit Simple sans variante', value: 'standard'},
  {label: 'Produit avec variante', value: 'variant'},
  {label: 'Produit composite', value: 'composite'},
];

const RadioButtons: React.FunctionComponent<RadioButtonsProps> = props => {
  return (
    <View>
      <RadioForm formHorizontal={false} animation={true}>
        {/* To create radio buttons, loop through your array of options */}
        {radio_props.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={true}
              onPress={val => console.log('button', val)}
              borderWidth={1}
              buttonInnerColor={'#e74c3c'}
              buttonOuterColor="#000"
              buttonSize={10}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{marginLeft: 10}}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={val => console.log('label', val)}
              labelStyle={{fontSize: 13, color: '#2ecc71'}}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
};

export default RadioButtons;
