// IMPORTS COMPOSANTS
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OurTitle from './Title';
import OurText from './OurText';
import convertColor from '../modules/convertColor';
// IMPORTS AUTRES
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const MealCard = (props) => {
  const { restaurant } = props;
  const { address, name, pdjDescription, pdjName, pdjSrc } = restaurant;

  return (
    <View style={styles.mealCard}>
      <View style={styles.top}>
        <View>
          <OurTitle h3={true}>{pdjName}</OurTitle>
          <OurTitle h5={true}>{name} (500m)</OurTitle>
        </View>
        <View style={styles.icons}>
          <FontAwesomeIcon
            style={styles.icon}
            name="heart"
            size={25}
            color={convertColor('cannelle')}
          />
          <FontAwesomeIcon
            style={styles.icon}
            name="bookmark-o"
            size={25}
            color={convertColor('cannelle')}
          />
        </View>
      </View>
      <OurText>{address}</OurText>
      <OurText>{pdjDescription}</OurText>
      <View style={styles.mealPictureContainer}>
        <Image
          style={styles.image}
          source={{
            uri: pdjSrc,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 388,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    backgroundColor: convertColor('poudrelibre'),
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderColor: convertColor('sable'),
    borderWidth: 2,
    shadowColor: convertColor('marronfoncé'),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  mealPictureContainer: {
    height: 150,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MealCard;