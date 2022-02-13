import {View, Text, ScrollView, ImageBackground, TextInput} from 'react-native';
import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';

import tw from '../../../../tailwind';

type Props = {};

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  
];

const ProductAccordion = (props: any) => {
  const [activeSections, setActiveSections] = useState([]);

  const renderSectionTitle = section => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = (section, i, isActive, sections) => {
    return (
      <View style={tw.style({ 'border-l-4  border-blue': isActive })}>
        <View
        style={tw.style('flex border-t border-[#D8D8D8] bg-white', { 'border-[#D8D8D8]': true })}>
        <View style={tw.style('flex-row m-2 items-center')}>
          <View style={tw.style('mr-2')}>
            <FIcon name={isActive? 'angle-down': 'angle-right'} size={20} />
          </View>
          <View>
            <Text>1</Text>
          </View>
          <View style={tw.style('flex-1')}>
            <View
              style={tw.style(
                'h-73px w-73px  items-center rounded-full',
              )}>
              <View style={tw.style('h-50px w-50px rounded m-auto')}>
                <ImageBackground
                  source={require('../../../assets/images/capachino2.png')}
                  resizeMode="cover"
                  style={tw.style('h-50px w-50px rounded')}
                />
              </View>
            </View>
          </View>
          <View style={tw.style('flex-2 mt-3')}>
            <View>
              <Text style={tw.style('text-dark font-medium')}>Capuccino</Text>
            </View>
            <View style={tw.style(' mb-2')}>
              <Text style={tw.style('')}>Moyen/maigre/aucun</Text>
            </View>
          </View>
          <View style={tw.style('flex-row')}>
            <View style={tw.style('mx-2 text-dark')}>
              <Text style={tw.style('text-dark font-medium')}>3</Text>
            </View>
            <View>
              <Text style={tw.style('text-dark font-medium')}>FCFA</Text>
            </View>

            <View style={tw.style('mx-3')}>
            <Icon name="delete" size={20} />
            </View>
          </View>
        </View>
        </View>
      </View>
    );
  };

  const renderContent = (section, i, isActive, sections) => {
    return (
      <View style={tw.style({ 'border-l-4  border-blue': isActive })}>
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
        <Animatable.View
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : 'zoomOut'}>
          <View style={tw.style('p-2 flex-row')}>
            <View>
            <TextInput style={tw.style(
                        'rounded bg-[#FFFFFF] w-full text-2xl border border-[#EDEEF0]',
                      )} keyboardType='number-pad'/>
            </View>
            <View>
              <View style={tw.style('m-2')}><Text>Quantity</Text></View>
            <TextInput style={tw.style('h-40px w-100px border mx-2')} keyboardType='number-pad'/>
            </View>
            <View>
            <View style={tw.style('m-2')}><Text>Price</Text></View>
            <TextInput style={tw.style('h-40px w-100px border mx-2')} keyboardType='number-pad'/>
            </View>
            <View>
            <View style={tw.style('m-2')}><Text>Discount(%)</Text></View>
            <TextInput style={tw.style('h-40px w-100px border mx-2')} keyboardType='number-pad'/>
            </View>
            </View>
            <View style={tw.style('mx-4 mb-3')}>
            <View style={tw.style('m-2')}><Text>Notes</Text></View>
            <TextInput style={tw.style('h-40px w-full border mx-2')}/>
            </View>
        </Animatable.View>
      </Animatable.View>
      </View>
    );
  };

  const updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  return (
    <ScrollView>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </ScrollView>
  );
};

export default ProductAccordion;
