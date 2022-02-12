import {View, Text} from 'react-native';
import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

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

const ListAccordion = (props: any) => {
  const [activeSections, setActiveSections] = useState([]);

  const renderSectionTitle = section => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = section => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const renderContent = section => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  return (
    <View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </View>
  );
};

export default ListAccordion;
