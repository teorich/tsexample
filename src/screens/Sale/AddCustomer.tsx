import { View, Text } from 'react-native'
import React from 'react'

import tw from "../../../tailwind";

type Props = {}

const AddCustomer = (props: Props) => {
  return (
    <View style={tw.style("bg-[#FDFDFE] h-100 rounded p-2")}>
      <Text>AddCustomer</Text>
    </View>
  )
}

export default AddCustomer