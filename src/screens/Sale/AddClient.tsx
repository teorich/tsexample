import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";

import CustomHeader from "../../screens/components/CustomHeader";

import tw from "../../../tailwind";
import { useFocusEffect } from "@react-navigation/native";
import AIcon from "react-native-vector-icons/AntDesign";
import FAIcon from "react-native-vector-icons/FontAwesome";
import ProductAccordion from "./components/ProductAccordion";

interface AddClientProps {
  setIsSelected: any;
  isSelected: boolean;
  navigation: any;
  isHome: boolean;
  route: any;
}

const productReducer = (prevState, action) => {
  let array;
  switch (action.type) {
    case "INIT":
      array = action.payload.map((item) => ({
        product: item,
        quantity: 1,
        customer: {},
        price: 0,
        discount: 0,
        note: "",
      }));
      return array;
    case "ADD":
      array = [...prevState];
      const check_index = array.findIndex(
        (item) => item.id === action.payload.id
      );
      if (check_index !== -1) {
        array[check_index].quantity++;
        console.log("Quantity updated:", array);
      }
      return array;
    case "SUBTRACT":
      array = [...prevState];
      const reduce_index = array.findIndex(
        (item) => item.id === action.payload.id
      );
      if (reduce_index !== -1) {
        if (array[reduce_index].quantity > 0) {
          array[reduce_index].quantity--;
          console.log("Quantity updated:", array);
        } else {
          array.splice(reduce_index, 1);
        }
      }
      return array;
    case "CLEAR":
      return (prevState = []);
    default:
      break;
  }
};

const AddClient: React.FC<AddClientProps> = ({ navigation, route }) => {
  const { params } = route;

  const [state, dispatcher] = useReducer(productReducer, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatcher({ type: "INIT", payload: params.data });
      return () => {
        dispatcher({ type: "CLEAR" });
      };
    }, [params.data])
  );

  const renderProduct = ({ item }) => {
    return (
      <View
        style={tw.style("flex border-t border-b border-[#D8D8D8] bg-white")}
      >
        <View style={tw.style("flex-row m-6 items-center")}>
          <View style={tw.style("flex-2")}>
            <View
              style={tw.style(
                "h-73px w-73px border-blue border-2 items-center rounded-full"
              )}
            >
              <View style={tw.style("h-50px w-50px rounded m-auto")}>
                <ImageBackground
                  source={require("../../assets/images/capachino2.png")}
                  resizeMode="cover"
                  style={tw.style("h-50px w-50px rounded")}
                />
              </View>
            </View>
          </View>
          <View style={tw.style("flex-3")}>
            <View>
              <Text style={tw.style("text-dark font-medium")}>Capuccino</Text>
            </View>
            <View style={tw.style("mb-2")}>
              <Text>Moyen/maigre/aucun</Text>
            </View>
            <View style={tw.style("flex-row items-center")}>
              <View
                style={tw.style(
                  "h-30px w-30px border-[#E5E9F2] items-center border mx-2 rounded-full"
                )}
              >
                <Text style={tw.style("m-auto")}>+</Text>
              </View>
              <View>
                <Text
                  style={tw.style("m-auto leading-5 text-base font-medium")}
                >
                  1
                </Text>
              </View>
              <View
                style={tw.style(
                  "h-30px w-30px border-[#E5E9F2] items-center mx-2 border rounded-full"
                )}
              >
                <Text style={tw.style("m-auto")}>-</Text>
              </View>
            </View>
          </View>
          <View style={tw.style("flex-1 flex-row")}>
            <View style={tw.style("mx-2 text-dark")}>
              <Text style={tw.style("text-dark font-medium")}>3</Text>
            </View>
            <View>
              <Text style={tw.style("text-dark font-medium")}>FCFA</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw.style("flex-1 bg-[#E5E9F2] mx-2")}>
      <CustomHeader
        navigation={navigation}
        isHome={false}
        route={route}
        onSelect={() => {}}
      />
      <ScrollView>
        <View style={tw.style("my-2")}>
          <View
            style={tw.style(
              "flex-row justify-center border border-[#EDEEF0] bg-white  rounded h-18 items-center"
            )}
          >
            <AIcon name="search1" size={20} style={tw.style("p-3")} />
            <TextInput
              style={tw.style("flex-1 pt-3 pb-3 pr-3 pl-0 h-20 w-full")}
            />
          </View>
        </View>

        <View style={tw.style("flex-row justify-center ml-3  my-4")}>
          <View style={tw.style("flex-2")}>
            <Text>Retrieve</Text>
          </View>
          <View style={tw.style("flex-2")}>
            <Text>Park</Text>
          </View>
          <View style={tw.style("flex-1")}>
            <Text>More</Text>
          </View>
        </View>
        <View style={tw.style("my-2")}>
          <View
            style={tw.style(
              "flex-row justify-center border border-[#EDEEF0] bg-white  rounded h-18 items-center"
            )}
          >
            <FAIcon name="user" size={20} style={tw.style("p-3")} />
            <TextInput
              style={tw.style("flex-1 pt-3 pb-3 pr-3 pl-0 h-20 w-full")}
            />
          </View>
        </View>
        {/* <View>
        <FlatList
          contentContainerStyle={tw.style('')}
          data={state}
          keyExtractor={item => item.product._id} //has to be unique
          renderItem={renderProduct} //method to render the data in the way you want using styling u need
          horizontal={false}
        />
      </View> */}
        <View style={tw.style("mt-6")}>
          <ProductAccordion />
        </View>
        <ScrollView style={tw.style("flex bg-white h-full")}>
          <View
            style={tw.style(
              "flex bg-white items-center border-t border-b border-[#D8D8D8]"
            )}
          >
            <View style={tw.style("m-10")} />
          </View>
          <View style={tw.style("flex bg-white border-t  border-[#D8D8D8]")}>
            <View style={tw.style("border-b border-[#D8D8D8]")}>
              <View style={tw.style("flex-row mb-1 mt-2")}>
                <View style={tw.style("flex-2 items-center")}>
                  <Text>Notes</Text>
                </View>
                <View style={tw.style("flex-3")} />
                <View style={tw.style("flex-1")}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={tw.style("flex-row mb-1 mt-2")}>
                <View style={tw.style("flex-2 items-center")}>
                  <Text>Remise</Text>
                </View>
                <View style={tw.style("flex-3")} />
                <View style={tw.style("flex-1")}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={tw.style("flex-row mb-1 mt-2")}>
                <View style={tw.style("flex-2 items-center")}>
                  <Text>Sous-total</Text>
                </View>
                <View style={tw.style("flex-3")} />
                <View style={tw.style("flex-1")}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={tw.style("flex-row my-4")}>
                <View style={tw.style("flex-2 items-center")}>
                  <Text>Impôts</Text>
                </View>
                <View style={tw.style("flex-3")} />
                <View style={tw.style("flex-1")}>
                  <Text>3</Text>
                </View>
              </View>
            </View>
            <View style={tw.style("border-t  border-[#D8D8D8]")}>
              <View style={tw.style("flex-row my-4")}>
                <View style={tw.style("flex-2 items-center")}>
                  <Text>Total</Text>
                </View>
                <View style={tw.style("flex-3")} />
                <View style={tw.style("flex-1")}>
                  <Text>3</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={tw.style("my-4")}>
            <Pressable style={tw.style("h-14 bg-accent rounded mx-5")}>
              <Text
                style={tw.style("m-auto font-extrabold text-dark uppercase")}
              >
                PayER XAF900.00
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddClient;
