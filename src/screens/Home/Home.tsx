import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context'
import {createStackNavigator} from '@react-navigation/stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList,
// } from '@react-navigation/drawer';

import OnboardingCard from '../../components/OnboardingCards/OnboardingCard';
import PointOfSalesSvg from '../../assets/images/PointOfSales.svg';
import AddUsers from '../../assets/images/AddUsers.svg';
import ConfigurePayment from '../../assets/images/ConfigurePayment.svg';
import AddProducts from '../../assets/images/AddProducts.svg';
import DoASale from '../../assets/images/DoASale.svg';
import ViewReports from '../../assets/images/ViewReports.svg';
import AddDetails from '../../assets/images/AddDetails.svg';
import UploadDocuments from '../../assets/images/UploadDocuments.svg';

import tw from '../../../tailwind';
import Title from '../../components/Title';
import CreateUser from '../Users/CreateUser';
import CustomHeader from '../components/CustomHeader';
import Users from '../Users/Users';
import CustomIcon from '../../../customIcon';
import AppModal from '../components/AppModal';
import ProductModal from '../Products/ProductModal';
import CreateProduct from '../Products/CreateProducts';
import AddCategory from '../Products/AddCategory';
import CategoryList from '../Products/CategoryList';
import Products from '../Products/Products';
import {useShops} from '../../providers/ShopProvider';
import Sale from '../Sale/Sale';
import AddClient from '../Sale/AddClient';

interface HomeProps {
  title?: string;
  navigation: any;
  route?: any;
}

function SettingScreen({navigation}) {
  return (
    <SafeAreaView>
      <CustomHeader navigation={navigation} isHome={true} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>settings!</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingDetails() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>SettingDetails!</Text>
    </SafeAreaView>
  );
}

// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Board: React.FunctionComponent<HomeProps> = ({navigation, route}) => {
  const [showModal, setShowModal] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Configurer des points de vente',
      subtitle: 'Configurez tous vos emplacements et registres de boutique',
      buttonTitle: 'CREE LES POINTS DE VENTE',
      svgComponent: () => <PointOfSalesSvg />,
      route: 'Board',
      handle: () => ({}),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Configurer les utilisateurs',
      subtitle: 'Configurer tous les utilisateurs et leurs différents rôles',
      buttonTitle: 'AJOUTER LES UTILISATEURS',
      svgComponent: () => <AddUsers />,
      route: 'UserStack',
      handle: () => navigation.navigate('UserStack'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d79',
      title: 'Configurez les types de paiement',
      subtitle:
        'Commencez à accepter plusieurs types de paiements dans vos points de vente.',
      buttonTitle: 'CONFIGUREZ PAIEMENT',
      svgComponent: () => <ConfigurePayment />,
      route: 'PaymentStack',
      handle: () => navigation.navigate('PaymentStack'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d70',
      title: 'Ajouter un produit',
      subtitle:
        'Vous pouvez ajouter des produits à Bip Shop un par un ou en gros',
      buttonTitle: 'AJOUTER DES PRODUITS',
      svgComponent: () => <AddProducts />,
      route: 'ProductStack',
      handle: () => setShowModal(true),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb287a',
      title: 'Faire une vente',
      subtitle:
        'Vous pouvez ajouter des produits à Bip Shop un par un ou en gros',
      buttonTitle: 'FAIRE UNE VENTE',
      svgComponent: () => <DoASale />,
      route: 'SellStack',
      handle: () => navigation.navigate('SellStack'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f53',
      title: 'Voir les rapports en detail',
      subtitle: 'suivre la performance de votre boutique et agrandir',
      buttonTitle: 'VOIR LE RAPPORT',
      svgComponent: () => <ViewReports />,
      route: 'Board',
      handle: () => ({}),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Ajouter les détails du propriétaire',
      subtitle:
        'Vous pouvez ajouter des produits à Bip Shop un par un ou en gros',
      buttonTitle: 'AJOUTER LES DETAILS',
      svgComponent: () => <AddDetails />,
      route: 'Board',
      handle: () => ({}),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d42',
      title: 'Uploader les documents requis',
      subtitle: 'suivre la performance de votre boutique et agrandir',
      buttonTitle: 'UPLOADER LES DOCUMENTS',
      svgComponent: () => <UploadDocuments />,
      route: 'Board',
      handle: () => ({}),
    },
  ];

  const modalContent = () => {
    return <ProductModal navigation={navigation} setShowModal={setShowModal} />;
  };

  const [boardMenus] = useState(DATA);
  return (
    <SafeAreaView style={tw.style('', 'bg-[#F9F8FE]')}>
      <View style={tw.style('absolute')}>
        {showModal && (
          <AppModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            children={modalContent()}
          />
        )}
      </View>
      <FlatList
        data={boardMenus}
        renderItem={item => (
          <View style={tw.style('""Bold m-4')}>
            <OnboardingCard
              svgComponent={item.item.svgComponent}
              title={item.item.title}
              subtitle={item.item.subtitle}
              buttonTitle={item.item.buttonTitle}
              handle={item.item.handle}
              navigation={navigation}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Users">
        {props => {
          return <Users isHome={true} {...props} />;
        }}
      </Stack.Screen>
      {/* <Stack.Screen name="Users">
        {props => <Users isHome={true} {...props} />}
      </Stack.Screen> */}
      <Stack.Screen name="createUser">
        {props => {
          return <CreateUser isHome={false} {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function BoardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="boardHome"
        component={Board}
        options={{
          header: props => (
            <Title
              {...props}
              textColor="text-dark"
              text="Bienvenue sur votre tableau de board!"
            />
          ),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SellStack({navigation}) {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: tw.style({hidden: isSelected, flex: !isSelected}),
    });
  }, [navigation, isSelected]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Sale">
        {props => {
          return (
            <Sale
              isHome={false}
              {...props}
              setIsSelected={setIsSelected}
              isSelected={isSelected}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen name="AddClient">
        {props => {
          return (
            <AddClient
              isHome={false}
              {...props}
              setIsSelected={setIsSelected}
              isSelected={isSelected}
            />
          );
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="SettingDetails" component={SettingDetails} />
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="SettingDetails" component={SettingDetails} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="SettingDetails" component={SettingDetails} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarButton: ['UserStack', 'ProductCategoryStack'].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: tw.style(' items-center'),
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Board':
              iconName = 'home';
              break;
            case 'ProductStack':
              iconName = 'headphones';
              break;
            case 'SellStack':
              iconName = 'shoppingbag';
              break;
            case 'PaymentStack':
              iconName = 'card';
              break;
            case 'ProfileStack':
              iconName = 'user';
              break;

            default:
              break;
          }

          // You can return any component that you like here!
          return (
            <CustomIcon
              name={iconName}
              size={25}
              color={color}
              style={tw.style('p-0')}
            />
          );
        },
        tabBarActiveTintColor: '#3E5066',
        tabBarInactiveTintColor: '#D8D8D8',
      })}>
      <Tab.Screen name="Board" component={BoardStack} />
      <Tab.Screen name="ProductStack" component={ProductStack} />
      <Tab.Screen name="SellStack" component={SellStack} />
      <Tab.Screen name="PaymentStack" component={PaymentStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
      <Tab.Screen
        name="UserStack"
        component={UserStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Help"
//         onPress={() =>
//           props.navigation.navigate('MenuTab', {screen: 'UserStack'})
//         }
//       />
//     </DrawerContentScrollView>
//   );
// }

export default function Home(props) {
  return (
    // <Drawer.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    //   useLegacyImplementation={true}
    //   initialRouteName="MenuTab"
    //   drawerContent={props => <CustomDrawerContent {...props} />}>
    //   <Drawer.Screen name="MenuTab" component={TabNavigator} />
    // </Drawer.Navigator>
    <TabNavigator />
  );
}
